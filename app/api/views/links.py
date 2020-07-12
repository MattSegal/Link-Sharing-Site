from django.conf import settings
from rest_framework import status, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from ..models import Link
from ..permissions import IsOwnerOrReadOnly
from ..serializers import LinkSerializer


class LinksPagination(PageNumberPagination):
    page_size_query_param = "size"
    page_size = settings.LINK_PAGE_SIZE
    max_page_size = settings.LINK_PAGE_SIZE


class LinkViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    permission_classes = [IsOwnerOrReadOnly]  # FIXME: Does this acutally work?
    queryset = Link.objects.filter(active=True).order_by("-created")
    serializer_class = LinkSerializer
    pagination_class = LinksPagination

    def create(self, request, *args, **kwargs):
        """Ensure user can only create links for themselves"""
        if not request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        data = {**request.data, "user_id": request.user.id}
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        """Soft delete links"""
        link = self.get_object()
        link.active = False
        link.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

