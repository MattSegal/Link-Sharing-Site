from django.urls import include, path
from django.contrib import admin

from . import views

index_view = views.IndexView.as_view()

urlpatterns = [
    # Django
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    # React Router
    path("bookmarks/", index_view),
    path("menu/", index_view),
    path("link/<int:id>/", index_view),
    path("add/", index_view),
    path("search/", index_view),
    path("login/", index_view),
    path("", index_view),
]
