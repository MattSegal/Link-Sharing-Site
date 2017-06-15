from django.conf.urls import url, include
# from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'comments',views.CommentViewSet)
# router.register(r'threads',views.ThreadViewSet)
# router.register(r'users', views.UserViewSet)
# router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    # url(r'^', include(router.urls)),
    url(r'^threads/',views.ThreadList.as_view(), name='thread-list'),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework'))
]