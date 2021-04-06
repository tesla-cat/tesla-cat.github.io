from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Post
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import logout, authenticate, login
from django.contrib import messages

def homepage(request):
    return render(
        request=request,
        template_name='home.html',
        context={"posts": Post.objects.all} 
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
                messages.info(request, f"logged in as {username}")
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