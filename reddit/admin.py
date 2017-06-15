from django.contrib import admin
from .models import Thread, Comment, RedditUser

admin.site.register(Thread)
admin.site.register(Comment)
admin.site.register(RedditUser)