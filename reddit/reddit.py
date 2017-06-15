"""
Gets data from Reddit
"""

import requests
import grequests
from django.utils import timezone
from datetime import timedelta, datetime
from links.settings import REDIS_HOST
from redis import Redis

# TODO: error handling
# TODO: keep track of request count in redis

USER_AGENT  = 'RedditFeed (by /u/the_amp_walrus)'
BASIC_AUTH  = 'basic cjZyMXBUWnY1RnM3d3c6U0h1QkgyYWEzenV3cnBGSFdSY1ExMDB3RDhr'
OAUTH_URI   = 'https://www.reddit.com/api/v1/access_token'
BASE_URI    = 'https://oauth.reddit.com/'

 
def exception_handler(request, exception):
    print "Request failed"

# this was done asynchronously whenany before
# we could check db 1st and if not anything recent then start loading
def get_comments(usernames,limit=25):
    url = lambda username: BASE_URI + "user/{0}/comments?limit={1}".format(username,limit)
    urls = [url(u) for u in usernames]
    headers = {
        'Authorization':  get_oauth_header(),
        'User-Agent': USER_AGENT
    }

    # Send all the requests in parallel
    comment_requests = (grequests.get(url,headers=headers) for url in urls)
    responses = grequests.imap(comment_requests, exception_handler=exception_handler)
    comments_by_user = (
        r.json()['data']['children'] 
        for r in responses
    )
    return [
        comment['data'] for comments_list in comments_by_user 
        for comment in comments_list
    ]


def get_threads(comments,limit=100):
    thread_ids = ",".join(set((c['link_id'] for c in comments)))
    print thread_ids
    uri = BASE_URI + "by_id/{0}?limit={1}".format(thread_ids, limit)
    r = requests.get(uri, headers={
        'Authorization':  get_oauth_header(),
        'User-Agent': USER_AGENT
    })
    threads_data = r.json()
    return [t['data'] for t in threads_data['data']['children']]


def test_data():
    return get_comments('the_amp_walrus',limit=3)


def get_oauth_header():
    """
    Get Reddit OAuth header if we don't have it already
    or if it expired.
    """
    REDIS_KEY = 'auth_token_{}'
    redis = Redis(host=REDIS_HOST)
    token = redis.get(REDIS_KEY.format('token'))
    created = redis.get(REDIS_KEY.format('created'))
    valid_seconds = redis.get(REDIS_KEY.format('valid')) or 0

    if created:
        created_datetime = datetime.strptime(created,'%Y-%m-%d %H:%M:%S.%f')
        valid_time =  created_datetime + timedelta(seconds=int(valid_seconds))
        is_expired = valid_time < datetime.now()
    else:
        is_expired = True

    if not token or is_expired:
        response = requests.post(
            OAUTH_URI, 
            data={'grant_type': 'client_credentials'},
            headers={
                'Authorization':  BASIC_AUTH,
                'User-Agent': USER_AGENT
            }
        )
        data =  response.json()
        token = data['access_token']
        redis.set(REDIS_KEY.format('token'), token)
        redis.set(REDIS_KEY.format('valid'), data['expires_in'])
        redis.set(REDIS_KEY.format('created'), datetime.now())

    return "bearer {0}".format(token)