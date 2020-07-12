from django.conf import settings
from django.db.models import Q
from rest_framework import exceptions, status, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin

from .models import Link
from .permissions import IsOwnerOrReadOnly
from .serializers import LinkSerializer, LoggedInUserSerializer


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


class SearchView(GenericAPIView, ListModelMixin):
    serializer_class = LinkSerializer
    pagination_class = LinksPagination

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Link.objects.filter(active=True).order_by("-created")
        search_term = self.request.GET.get("query")
        if search_term:
            query = (
                Q(title__icontains=search_term)
                | Q(user__username__icontains=search_term)
                | Q(url__icontains=search_term)
                | Q(description__icontains=search_term)
            )
            queryset = queryset.filter(query).distinct()
            return queryset.all()
        else:
            return queryset.none()
