"""
Offline tasks
"""
import time
import logging

import praw
from django.conf import settings


from .models import Link
from .utils import WithSentryCapture

log = logging.getLogger(__name__)


def _sync_link(link_id: str, subreddit=None):
    """
    Create a new link in a subreddit if it hasn't been created yet
    https://praw.readthedocs.io/en/latest/code_overview/models/subreddit.html#praw.models.Subreddit.submit
    """
    if not subreddit:
        log.info("No subreddit suppied, creating a new one.")
        subreddit = get_subreddit()

    link = Link.objects.get(id=link_id)
    if link.reddit_id:
        log.info("Skipping link %s %s, already synced", link.id, link)
        return

    log.info("Syncing link %s %s", link.id, link)
    log.info("Checking for existing link with title %s", link.title)
    results = [r for r in subreddit.search(f"title:{link.title}")]
    time.sleep(2)
    if results:
        submission = results[0]
        log.info("Found %s results, using %s", len(results), submission)
        Link.objects.filter(id=link.id).update(reddit_id=submission.id)
        return

    log.info("Did not find any matching results.")
    if link.user.username == "kath":
        flair_id = "18231654-c81e-11ea-880a-0ee50f52dd0f"
    elif link.user.username == "matt":
        flair_id = "121f8bfa-c825-11ea-8ea7-0ecb25f113bb"
    else:
        flair_id = None

    log.info("%s %s %s", link.title, link.url, flair_id)
    submission = subreddit.submit(link.title, url=link.url, flair_id=flair_id)
    Link.objects.filter(id=link.id).update(reddit_id=submission.id)
    time.sleep(2)


sync_link = WithSentryCapture(_sync_link)


def _create_new_links():
    """Create new links in subreddit that haven't been created yet"""
    link_ids = (
        Link.objects.filter(active=True, reddit_id="")
        .order_by("created")
        .values_list("id", flat=True)
    )
    if not link_ids:
        log.info("No links to sync")
        return

    log.info("Syncing %s links to Reddit", len(link_ids))
    subreddit = get_subreddit()
    for link_id in link_ids:
        _sync_link(link_id, subreddit=subreddit)

    log.info("Finished syncing %s links to Reddit", len(link_ids))


create_new_links = WithSentryCapture(_create_new_links)


def get_subreddit():
    reddit = praw.Reddit(
        user_agent=settings.REDDIT_USER_AGENT,
        client_id=settings.REDDIT_CLIENT_ID,
        client_secret=settings.REDDIT_CLIENT_SECRET,
        username=settings.REDDIT_USERNAME,
        password=settings.REDDIT_PASSWORD,
    )
    return reddit.subreddit("mattslinks")

