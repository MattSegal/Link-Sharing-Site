import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

from . import *

DEBUG = False
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")
ALLOWED_HOSTS = ["www.mattslinks.xyz", "mattslinks.xyz", "167.99.78.141", "127.0.0.1", "localhost"]

sentry_sdk.init(
    dsn=os.environ.get("RAVEN_DSN"), integrations=[DjangoIntegration()], environment="prod"
)
