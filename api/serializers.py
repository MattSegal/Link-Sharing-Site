from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Link, Tag
from reddit.serializers import RedditUserSerializer

class UserSerializer(serializers.ModelSerializer):
    reddit_users = RedditUserSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id','username','bookmarks', 'reddit_users')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name',)

class LinkSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    created = serializers.DateTimeField(read_only=True)
    tags = serializers.SerializerMethodField()
    
    class Meta:
        model = Link
        fields = ('id','user','title','url','created','description','tags',)

    def get_tags(self, obj):
        return [tag for tag in TagSerializer(obj.tags).data]