"""
Django settings for links project.

Generated by 'django-admin startproject' using Django 1.10.4.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""

import os

IS_PROD = os.environ.get('DEPLOY_STATUS') == 'PROD'
IS_TEST = os.environ.get('DEPLOY_STATUS') == 'TEST'

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LOGIN_REDIRECT_URL = '/'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# DON'T TELL ME HOW TO LIVE MY LIFE DJANGO
# I DO WHAT I WANT
SECRET_KEY = 'rn@6za8rsag%e&7qy+!6i2kp8wqx@)in3(4=qcj*0uzms18u_!'


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = not IS_PROD
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS').split(',')

# Application definition
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'assets'),
)

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': '/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
    }
}

INSTALLED_APPS = [
    # Links
    'api.apps.ApiConfig',
    # Third Party
    'rest_framework',   # REST API
    'webpack_loader',   # Webpack bundling
    'corsheaders',      # Cross Origin Request Sharing header settings
    # Default
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

SESSION_EXPIRE_AT_BROWSER_CLOSE = False
SESSION_COOKIE_AGE = 60*60*24*365*12  # seconds => 12 months

CORS_ORIGIN_ALLOW_ALL = True  # Sketchy

ROOT_URLCONF = 'links.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'links', 'templates')
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'links.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

sqlite_db = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

postgres_db = {
    'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'links',
            'USER': 'django',
            'PASSWORD': 'password',
            'HOST': 'localhost',
            'PORT': '5432',
        }
}

DATABASES = postgres_db if (IS_PROD or IS_TEST) else sqlite_db

# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',  # noqa
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',  # noqa
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',  # noqa
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',  # noqa
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_URL = '/static/'

if IS_PROD or IS_TEST:
    STATIC_ROOT = os.environ.get('DJANGO_STATIC_ROOT')

USE_HTTPS = IS_PROD
