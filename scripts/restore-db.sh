#!/bin/bash
# Script to restore local docker instance DB from the latest backup on S3
# Requires AWS command line installed & credentials configured with "anika" profile.
function run_docker {
   docker-compose -f docker/docker-compose.local.yml run --rm web $@
} 

# Stop all Docker containers
echo -e "\nStopping all running Docker containers"
docker update --restart=no `docker ps -q`
docker kill `docker ps -q`

# Reset db
echo -e "\nResetting database"
run_docker ./manage.py reset_db --close-sessions --noinput

# Download latest backup from S3
echo -e "\nRestoring database from S3 backups"
S3_BUCKET=s3://swarm-db-backup
LATEST_BACKUP=`aws --profile default s3 ls $S3_BUCKET/links/ | sort |  grep postgres_links | tail -n 1 | awk '{print $4}'`
aws --profile default s3 cp ${S3_BUCKET}/links/${LATEST_BACKUP} - | gunzip | \
    pg_restore \
        --clean \
        --dbname postgres \
        --host localhost \
        --port 25432 \
        --username postgres \
        --no-owner

# Setup latest data
echo -e "\nRunning migrations"
run_docker ./manage.py migrate

echo -e "\nCreating new superuser 'admin'"
run_docker ./manage.py createsuperuser \
   --username admin \
   --email admin@example.com \
   --noinput

echo -e "\nSetting superuser 'admin' password to 12345"
SHELL_CMD="\
u=User.objects.get(username='admin');\
u.set_password('12345');\
u.save();\
"
run_docker ./manage.py shell_plus -c "$SHELL_CMD"

echo -e "\nDatabase restore finished."
