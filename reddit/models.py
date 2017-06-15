from __future__ import unicode_literals
import time
from django.utils.dateformat import format
from django.db import models
import datetime
from django.utils import timezone
from django.contrib.auth.models import User


class RedditUser(models.Model):
    """ A reddit user
        TODO: Add validation by calling reddit API
    """
    username        = models.CharField(max_length=20, unique=True)
    followers       = models.ManyToManyField(User, related_name='reddit_users')
    # is_valid

    def __unicode__(self):
        return '<RedditUser: {0}>'.format(self.username)


class Thread(models.Model):
    """ A reddit discussion thread
    """
    REDDIT_TYPE     = 't3'
    reddit_id       = models.CharField(max_length=6,primary_key=True)
    is_self         = models.BooleanField()
    score           = models.IntegerField()
    num_comments    = models.PositiveIntegerField()
    created_utc     = models.BigIntegerField()
    author          = models.CharField(max_length=50)
    subreddit       = models.CharField(max_length=100)
    permalink       = models.CharField(max_length=250)    
    title           = models.CharField(max_length=250)
    url             = models.CharField(max_length=500)
    updated         = models.DateTimeField(auto_now=True)

    @staticmethod
    def from_reddit(**data):
        return Thread(**{
            'reddit_id': data['id'],
            'is_self': data['is_self'],
            'score': data['score'],
            'num_comments': data['num_comments'],
            'created_utc': data['created_utc'],
            'author': data['author'],
            'subreddit': data['subreddit'],
            'permalink': data['permalink'],
            'title': data['title'],
            'url': "http://www.reddit.com" + data['permalink'],
        })

    def __unicode__(self):
        return '<Thread: {0} - {1} - {2}>'.format(self.author,self.subreddit, self.created_utc)


class Comment(models.Model):
    """ A comment in a reddit thread
    """
    reddit_id       = models.CharField(max_length=6,primary_key=True)
    thread          = models.ForeignKey(Thread, related_name='comments', on_delete=models.CASCADE)
    author          = models.ForeignKey(RedditUser, related_name='comments', on_delete=models.CASCADE)
    score           = models.IntegerField()
    downs           = models.PositiveIntegerField()
    created_utc     = models.BigIntegerField()
    body            = models.TextField()
    body_html       = models.TextField()
    updated         = models.DateTimeField(auto_now=True)

    @staticmethod
    def from_reddit(username, **data):
        return Comment(**{
            'reddit_id': data['id'],
            'thread': thread,
            'score': data['score'],
            'downs': data['downs'],
            'created_utc': data['created_utc'],
            # 'author': data['author'], // use RedditUser obj or id?
            'body': data['body'],
            'body_html': data['body_html'] #probably just use this
        })

    def __unicode__(self):
        return '<Comment: {0} - {1}>'.format(self.author,self.reddit_id)
