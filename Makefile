#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

SHELL = /bin/sh

IMAGES_PREFIX := $(shell basename $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST)))))

# Important: Local images naming should be in docker-compose naming style

APP_CONTAINER_NAME := app
NGINX_CONTAINER_NAME := nginx-app

docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(shell command -v docker-compose 2> /dev/null)

.PHONY : help up down \
        shell
.DEFAULT_GOAL := help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# --- [ Development tasks ] -------------------------------------------------------------------------------------------

---------------: ## ---------------
up:
	$(docker_compose_bin) up --no-recreate -d "$(NGINX_CONTAINER_NAME)"
	$(docker_compose_bin) up --no-recreate "$(APP_CONTAINER_NAME)"

down: ## Stop all started for development containers
	$(docker_compose_bin) down

dev: up ## Run node in Development mode
	$(docker_compose_bin) run --workdir="/app" --rm "$(APP_CONTAINER_NAME)" yarn dev

start: up ## Run node in Production mode
	$(docker_compose_bin) run --workdir="/app" --rm "$(APP_CONTAINER_NAME)" yarn start

shell: up ## Start shell into application container
	$(docker_compose_bin) run --rm "$(APP_CONTAINER_NAME)" /bin/sh

