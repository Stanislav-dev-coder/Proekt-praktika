#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

SHELL = /bin/sh

IMAGES_PREFIX := $(shell basename $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST)))))

# Important: Local images naming should be in docker-compose naming style

APP_CONTAINER_NAME := app
NODE_CONTAINER_NAME := node
NGINX_CONTAINER_NAME := nginx-app

docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(shell command -v docker-compose 2> /dev/null)

.PHONY : help up down restart \
        shell install \
        init
.DEFAULT_GOAL := help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# --- [ Development tasks ] -------------------------------------------------------------------------------------------

---------------: ## ---------------

start: ## Full build app container and start it
	$(docker_compose_bin) up -d "$(NGINX_CONTAINER_NAME)"
	$(docker_compose_bin) up "$(APP_CONTAINER_NAME)"

down: ## Stop all started for development containers
	$(docker_compose_bin) down

shell: ## Start shell into application container
	$(docker_compose_bin) run --rm "$(NODE_CONTAINER_NAME)" /bin/sh

install: ## Install NPM packages deps
	$(docker_compose_bin) run --workdir="/app" --rm "$(NODE_CONTAINER_NAME)" yarn install --global-folder /tmp/ --cache-folder /tmp/ --non-interactive --ignore-optional --frozen-lockfile