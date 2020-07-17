FROM ubuntu:bionic

ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8
ENV DEBIAN_FRONTEND noninteractive
ENV PYTHONUNBUFFERED 1
ENV PYTHONIOENCODING UTF-8
ENV TIMEZONE Australia/Melbourne

RUN \
  echo "Updating apt sources." && \
  apt-get -qq update && \
  echo "Installing required packages." && \
  apt-get -qq install \
  python3-pip \
  python3.6-dev \
  postgresql-client \
  postgresql-common \
  iputils-ping

WORKDIR /app

# Install Python packages
COPY app/requirements.txt .
RUN \
  echo "Installing python packages..." && \
  pip3 install -r requirements.txt


# Mount the codebase
ADD app /app

ARG REDDIT_CLIENT_ID=reddit
ARG REDDIT_CLIENT_SECRET=reddit
ARG REDDIT_USERNAME=reddit
ARG REDDIT_PASSWORD=reddit
ARG DJANGO_SETTINGS_MODULE=links.settings.prod
ARG DJANGO_SECRET_KEY=not-a-secret
RUN mkdir -p /static/ && ./manage.py collectstatic --noinput
