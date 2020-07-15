#!/bin/bash
# Script to deploy.
set -e
export HOST='167.99.78.141'
REPO="links"
ssh root@$HOST /bin/bash << EOF
    set -e
    cd /root/repos/$REPO
    echo "Cleaning $REPO git repository"
    git reset --hard
    git clean -dfx
    git checkout master
    git pull
    echo "Building $REPO"
    pushd frontend
    yarn install
    yarn build
    popd
    docker-compose -f docker/docker-compose.prod.yml build
    echo "Pushing $REPO to local registry"
    docker-compose push 
    echo "Deploying $REPO to docker swarm"
    docker stack deploy --compose-file docker/docker-compose.prod.yml $REPO
EOF