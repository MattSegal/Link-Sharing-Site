import json

from django.conf import settings
from django.views.generic import TemplateView

from api.models import Link
from api.serializers import LinkSerializer, LoggedInUserSerializer


class IndexView(TemplateView):
    template_name = "links/index.html"

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        links = Link.objects.filter(active=True).order_by("-created")[: settings.LINK_PAGE_SIZE]
        bootstrap_data = {
            "links": {
                "items": LinkSerializer(links, many=True).data,
                "next": "/api/link/?page=2",  # yucky hack
            }
        }

        if self.request.user.is_authenticated:
            bootstrap_data["loggedInUser"] = LoggedInUserSerializer(self.request.user).data

        context["title"] = "Links"
        context["bootstrap_data"] = json.dumps(bootstrap_data)
        return context
