#!/bin/bash
. .env
    docker-compose down


sudo -E sed -i '' "/$VIRTUAL_HOST/d" /etc/hosts

echo "Container $VIRTUAL_HOST is stopped"
