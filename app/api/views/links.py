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

    def destroy(self, request, *args, **kwargs):
        """Soft delete links"""
        link = self.get_object()
        link.active = False
        link.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

