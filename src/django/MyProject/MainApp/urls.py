from django.urls import path
from . import views

urlpatterns = [
    path("", views.homepage, name="homepage"),
    path("signUp", views.signUp, name="signUp"),
    path("signIn", views.signIn, name="signIn"),
    path("signOut", views.signOut, name="signOut")
]