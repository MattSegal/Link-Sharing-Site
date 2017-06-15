from rest_framework import serializers
from .models import Thread, Comment, RedditUser

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author_id.username',read_only=True)
    class Meta:
        model = Comment
        fields = ('score', 'downs', 'created_utc', 'reddit_id', 'author', 'body_html',)

class ThreadSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Thread
        fields = ('reddit_id', 'is_self', 'score', 'num_comments', 'comments', 'created_utc', 'author', 'subreddit', 'permalink', 'title', 'url',)

class RedditUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RedditUser
        fields = ('username',)