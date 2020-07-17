import logging

from django.db.models.signals import post_save
from django.dispatch import receiver
from django_q.tasks import async_task

from .models import Link
from .tasks import sync_link

logger = logging.getLogger(__name__)


@receiver(post_save, sender=Link)
def save_link(sender, instance, **kwargs):
    link = instance
    if not link.reddit_id:
        logger.info("Dispatching Reddit sync task for Link<%s]>", link.id)
        async_task(sync_link, link.id)
