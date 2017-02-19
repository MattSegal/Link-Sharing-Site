from django.db import models
from django.contrib.auth.models import User

# see https://docs.djangoproject.com/en/1.10/ref/contrib/auth/#django.contrib.auth.models.User
# for user API

class Link(models.Model):
    """ A hyperlink belonging to a user
    """
    id              = models.IntegerField(primary_key=True)
    user            = models.ForeignKey(User, related_name='links')  
    title           = models.CharField(max_length=250) # Unsure of max_length
    url             = models.URLField(max_length=250) # Unsure of max_length
    created         = models.DateTimeField(auto_now_add=True)
    modified        = models.DateTimeField(auto_now=True)

    def __repr__(self):
        return '<Link: {0} - {1}>'.format(self.user,self.title)
