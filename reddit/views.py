import datetime

from django.contrib.auth.models import Group, User
from django.db import transaction
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

import reddit
from .serializers import CommentSerializer, ThreadSerializer

from .models import Comment, RedditUser, Thread
from .utils import Timer
from django.core.cache import cache
from links.settings import REDIS_HOST
from redis import Redis

# http://michal.karzynski.pl/blog/2013/07/14/using-redis-as-django-session-store-and-cache-backend/

class ThreadList(APIView):
    REDIS_KEY = "thread_list_usernames"

    # @transaction.atomic
    def get(self, request):
        """
        Get a list of the latest threads for a set of users
        """
        user_params = request.GET.get('users')
        force_refresh = request.GET.get('force_refresh',False)

        if not user_params:
            return Response([])


        # Check redis for recent users
        # redis = Redis(host=REDIS_HOST)
        # cached_usernames = redis.get(self.REDIS_KEY)
        # cached_usernames = set(cached_usernames.split(',')) if cached_usernames else set()

        # TODO: Cache data in redis

        requested_usernames = user_params.split(',')

        comments_data = reddit.get_comments(requested_usernames) # ~1.5s
        threads_data = reddit.get_threads(comments_data)

        threads = {
            thread_data['id']: Thread.from_reddit(**thread_data) 
            for thread_data in threads_data
        }

        for comment_data in comments_data:
            continue
            thread_id = comment_data['link_id'].replace('t3_','')
            comment_thread = threads[thread_id]
            comment_thread.comments.append(
                Comment.from_reddit(comment_thread, **comment_data)
            )

        serializer = ThreadSerializer(threads.values(), many=True)
        return Response(serializer.data)
