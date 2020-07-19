#!/bin/bash
set -e
echo "Running migrations"
./manage.py migrate

mkdir -p /var/log/gunicorn
echo "Starting gunicorn"
gunicorn links.wsgi:application \
  --name links \
  --preload \
  --workers 1 \
  --threads 2 \
  --bind 0.0.0.0:8001 \
  --capture-output \
  --log-level info \
  --error-logfile /var/log/gunicorn/error.log \
  --access-logfile /var/log/gunicorn/access.log
