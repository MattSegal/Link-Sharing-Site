from django.db import models
from django.contrib.auth.models import User


class Link(models.Model):
    """A hyperlink belonging to a user"""

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="links")
    bookmarkers = models.ManyToManyField(User, related_name="bookmarks", blank=True)
    title = models.CharField(max_length=250)
    url = models.CharField(max_length=250)
    description = models.TextField(default="", blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)
    reddit_id = models.CharField(default="", max_length=64, blank=True)

    def __str__(self):
        return "{0} - {1}".format(self.user, self.title)

    def save(self, *args, **kwargs):
        link_has_scheme = self.url.startswith("http://") or self.url.startswith("https://")
        if not link_has_scheme:
            self.url = f"http://{self.url}"

        super().save(*args, **kwargs)

