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

.PHONY : help up down \
		shell install build \
		start dev inspect
.DEFAULT_GOAL := help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# --- [ Development tasks ] -------------------------------------------------------------------------------------------

up:
	$(docker_compose_bin) up --no-recreate -d

down: ## Stop all started for development containers
	$(docker_compose_bin) down

install: ## Install dependency
	$(docker_compose_bin) -f ./docker-compose-build.yml run --workdir="/app" --service-ports --rm "$(NODE_CONTAINER_NAME)" yarn install --non-interactive --ignore-optional --frozen-lockfile

build: ## Build
	$(docker_compose_bin) -f ./docker-compose-build.yml run --workdir="/app" --service-ports --rm "$(NODE_CONTAINER_NAME)" yarn build
