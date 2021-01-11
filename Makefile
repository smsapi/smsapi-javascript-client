.PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help

NODE_ENV ?= development

export NODE_ENV

APP_VOLUME=${PWD}:/app
NODE_IMAGE=node:12.8-alpine
USERID=$(shell id -u)

DOCKER_RUN = docker run \
	--volume "${APP_VOLUME}" \
	--workdir /app \
	--env NODE_ENV \
	--user ${USERID}:${USERID} \
	--rm \
  --interactive

DOCKER_RUN_NODE = ${DOCKER_RUN} \
	${NODE_IMAGE}

install: ## install dependencies
	${DOCKER_RUN_NODE} yarn install

lint: ## scss and js linter
	${DOCKER_RUN_NODE} yarn lint

build: ## build
	${DOCKER_RUN_NODE} yarn build

build-watch: ## build with watch
	${DOCKER_RUN_NODE} yarn start

test-lib: ## run test
	${DOCKER_RUN} --env-file ./.env.test ${NODE_IMAGE} yarn test
