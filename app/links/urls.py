from django.urls import include, path
from django.contrib import admin

from . import views

urlpatterns = [
    # Django
    path("login/", views.login),
    path("logout/", views.logout),
    path("signup/", views.signup),
    path("change/", views.change_password),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    # React Router
    path("bookmarks/", views.IndexView.as_view()),
    path("menu/", views.IndexView.as_view()),
    path("link/<int:id>/", views.IndexView.as_view()),
    path("add/", views.IndexView.as_view()),
    path("account/", views.IndexView.as_view()),
    path("search/", views.IndexView.as_view()),
    path("", views.IndexView.as_view()),
]
