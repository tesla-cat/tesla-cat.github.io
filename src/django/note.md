
# tutorial 1

- shell

```shell
django-admin startproject MyProject
python manage.py startapp MainApp
python manage.py runserver
```

- `MyProject\MyProject\settings.py`

```python
INSTALLED_APPS = [
    "MainApp.apps.MainappConfig",
]
```

- `MyProject\MyProject\urls.py`

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include("MainApp.urls")),
    path('admin/', admin.site.urls),
]
```

- add `MyProject\MainApp\urls.py`

```python
from django.urls import path
from . import views

urlpatterns = [
    path("", views.homepage, name="homepage"),
]
```

- `MyProject\MainApp\views.py`

```python 
from django.shortcuts import render
from django.http import HttpResponse

def homepage(request):
    return HttpResponse("hello")
```

# tutorial 2

- `MyProject\MainApp\models.py`

```python
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    date = models.DateTimeField('date')
    def __str__(self):
        return self.title
```

- shell

```shell
python manage.py makemigrations
python manage.py migrate
```

# tutorial 3

- shell

```shell
python manage.py createsuperuser
```

- `MyProject\MainApp\admin.py`

```python
from django.contrib import admin
from .models import Post

admin.site.register(Post)
```

- shell

```shell
pip install django-tinymce4-lite
```

- `MyProject\MyProject\settings.py`

```python
INSTALLED_APPS = [
    "tinymce",
]
```

- `MyProject\MyProject\urls.py`

```python
urlpatterns = [
    path('tinymce/', include('tinymce.urls')),
]
```

- `MyProject\MainApp\admin.py`

```python
from django.contrib import admin
from .models import Post
from tinymce.widgets import TinyMCE
from django.db import models

class PostAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': TinyMCE()},
    }

admin.site.register(Post, PostAdmin)
```

# tutorial 4

- `MyProject\MainApp\views.py`

```python
from django.shortcuts import render
from django.http import HttpResponse
from .models import Post

def homepage(request):
    return render(
        request=request,
        template_name='home.html',
        context={"posts": Post.objects.all} 
    )
```

- add `MyProject\MainApp\templates\header.html`
- add `MyProject\MainApp\templates\home.html`

# tutorial 5

# tutorial 6, 7

- add `MyProject\MainApp\templates\signUp.html`

- `MyProject\MainApp\views.py`

```python
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
            return redirect("MainApp:homepage")
        else:
            for code, message in form.error_messages.items():
                messages.error(request, f"{message}")
            return response(form)
    return response(UserCreationForm)
```

- `MyProject\MainApp\urls.py`

```python
urlpatterns = [
    path("signUp", views.signUp, name="signUp"),
    path("signIn", views.signIn, name="signIn"),
    path("signOut", views.signOut, name="signOut"),
]
```

# tutorial 8