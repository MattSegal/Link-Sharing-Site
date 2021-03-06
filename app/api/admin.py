from django.contrib import admin

from .models import Link


@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    ordering = ("-created",)
    list_display = ("id", "user", "title", "created", "url", "reddit_id", "active")
    list_filter = ("user",)

