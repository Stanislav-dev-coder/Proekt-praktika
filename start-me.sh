#!/bin/bash
if [ -e .env ]
then
    echo "Try .env"
else
    echo "ERROR!  Create .env from template please!"
#	cp .env.example .env
  exit 3
fi
MYLOCALUSR=`whoami`
. .env
CONTAINER=$VIRTUAL_HOST
if [ -e docker/conf/nginx-site.conf ]
then
  RUNNING=$(docker inspect --format="{{.State.Running}}" $CONTAINER 2> /dev/null)

  if [ $? -eq 1 ]; then
    echo "UNKNOWN - $CONTAINER does not exist."

    docker-compose up -d
      STARTED=$(docker inspect --format="{{.State.StartedAt}}" $CONTAINER)
      NETWORK=$(docker inspect --format="{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" $CONTAINER)

      echo "OK - $CONTAINER is running. IP: $NETWORK, StartedAt: $STARTED"
       echo "127.0.0.1 $VIRTUAL_HOST" | sudo tee -a /etc/hosts
         docker exec -it $VIRTUAL_HOST bash
    #   docker-compose up -d
  #     docker exec -it $VIRTUAL_HOST_CN bash
    exit 3
else
   docker exec -it $VIRTUAL_HOST bash
  fi
else

echo "Adding vhost echo $VIRTUAL_HOST"
cp docker/conf/nginx-site.conf.tpl docker/conf/nginx-site.conf
sed -i '' "s/react.test/$VIRTUAL_HOST/" docker/conf/nginx-site.conf
sed -i '' "s/server 127.0.0.1:3000;/server 127.0.0.1:$PORT;/" docker/conf/nginx-site.conf

sed -i '' "s/server_name node.test/server_name $VIRTUAL_HOST/" docker/conf/nginx-site.conf
echo "127.0.0.1 $VIRTUAL_HOST" | sudo tee -a /etc/hosts
docker-compose up -d
echo "Welcome to docker container $VIRTUAL_HOST"
docker exec -it $VIRTUAL_HOST bash

  exit 3
fi
