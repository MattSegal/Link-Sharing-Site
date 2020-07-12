from rest_framework import exceptions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Link
from ..serializers import LoggedInUserSerializer


class BookmarkAPIView(APIView):
    """
    Create or remove a bookmark
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, link_pk):
        try:
            link = Link.objects.get(pk=link_pk)
        except Link.DoesNotExist:
            raise exceptions.NotFound

        link.bookmarkers.add(request.user)
        serializer = LoggedInUserSerializer(request.user)
        return Response(serializer.data)

    def delete(self, request, link_pk):
        try:
            link = Link.objects.get(pk=link_pk)
        except Link.DoesNotExist:
            raise exceptions.NotFound

        link.bookmarkers.remove(request.user)
        serializer = LoggedInUserSerializer(request.user)
        return Response(serializer.data)
