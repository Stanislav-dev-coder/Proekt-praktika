#!/bin/bash

if [ -e .env ]; then
    echo "WORK: Trying .env file."
else
    echo "ERROR: Create .env file from template."
    exit 1
fi

MYLOCALUSR=`whoami`

. .env

if [ -z "$GIT_EMAIL" ]; then
     echo "Define GIT_EMAIL and GIT_NAME variables in .env file"
     echo $GIT_EMAIL
     exit 1
   fi
   if [ -z "$GIT_NAME" ]; then
     echo "Define GIT_EMAIL and GIT_NAME variables in .env file"
     echo $GIT_NAME
     exit 1
   fi

if [ ! "$(docker ps -q -f name=$VIRTUAL_HOST)" ]; then

    echo "WORK: Virtual host '$VIRTUAL_HOST' does not exist."

    docker-compose up -d
        STARTED=$(docker inspect --format="{{.State.StartedAt}}" $VIRTUAL_HOST)
        NETWORK=$(docker inspect --format="{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" $VIRTUAL_HOST)

    echo "OK - $VIRTUAL_HOST is running. IP: $NETWORK, StartedAt: $STARTED"
    echo "127.0.0.1 $VIRTUAL_HOST" | sudo tee -a /etc/hosts

fi

docker exec -it $VIRTUAL_HOST bash
exit 0

