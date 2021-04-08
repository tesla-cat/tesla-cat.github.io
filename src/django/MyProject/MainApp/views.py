from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Post
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import logout, authenticate, login
from django.contrib import messages
from datetime import datetime
from .task.uploadPOSReports import uploadPOSReports

import pathlib, os
parentPath = pathlib.Path(__file__).parent.absolute()
logPath = os.path.join(parentPath, 'task', 'log.txt')

def homepage(request):
    if request.method == 'POST':
        if not request.POST['date']:
            messages.error(request, f"Invalid date!")
        else:
            if not request.user.is_staff:
                messages.error(request, f"You must be a staff that has signed in!")
            else:
                try:
                    dateTime = datetime.strptime(request.POST['date'], r'%Y/%m/%d')
                    def onMessage(m: str):
                        if m.startswith('success'):
                            messages.success(request, m)
                        else:
                            messages.error(request, m)
                    uploadPOSReports(dateTime, onMessage)
                except Exception as e:
                    messages.error(request, f"{str(e)}")
    try:
        with open(logPath, 'r') as f:
            log = f.read()
    except:
        log = 'No log yet'
    return render(
        request=request,
        template_name='home.html',
        context={"posts": Post.objects.all, "log": log} 
    )

def signUp(request):
    def response(form):
        return render(
            request=request,
            template_name='signUp.html',
            context={"form": form}
        )
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f"New account created: {username}")
            login(request, user)
            return redirect('/')
        else:
            for code, message in form.error_messages.items():
                messages.error(request, f"{message}")
            return response(form)
    return response(UserCreationForm)

def signOut(request):
    logout(request)
    messages.info(request, "Signout successful !")
    return redirect('/')

def signIn(request):
    if request.method == 'POST':
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"Signed in as {username}")
                return redirect('/')
            else:
                messages.error(request, "error")
        else:
            messages.error(request, "error")
    return render(
        request = request,
        template_name="signIn.html",
        context={"form": AuthenticationForm()}
    )