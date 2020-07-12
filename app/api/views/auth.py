from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from ..serializers import AuthSerializer, LoggedInUserSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_view(request):
    user_data = LoggedInUserSerializer(request.user).data
    return Response(user_data)


@api_view(["POST"])
def login_view(request):
    serializer = AuthSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    cleaned = serializer.data
    user = authenticate(username=cleaned["username"], password=cleaned["password"])
    if user:
        login(request, user)
    code = status.HTTP_200_OK if user else status.HTTP_401_UNAUTHORIZED
    return Response(status=code)
