from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"link", views.LinkViewSet)
urlpatterns = [
    path("user/", views.user_view),
    path("login/", views.login_view),
    path("bookmark/<int:link_pk>/", views.BookmarkAPIView.as_view()),
    path("search/", views.SearchView.as_view()),
    path("", include(router.urls)),
]
