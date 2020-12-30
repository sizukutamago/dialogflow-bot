# variables ----

	# STAGE := dev
	STAGE := prd
	SERVICE_NAME := dialogflow-bot
	PROJECT := dialogflow-bot

# docker -------

buildup:
	docker-compose up -d --build
up:
	docker-compose up -d
downv:
	docker-compose down -v
down:
	docker-compose down
ps:
	docker-compose ps
restart:
	docker-compose restart
logs:
	docker-compose logs $(arg)

# general -------
init:
	export STAGE=$(STAGE)

