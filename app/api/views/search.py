from django.db.models import Q
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin

from ..models import Link
from ..serializers import LinkSerializer
from .links import LinksPagination


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
