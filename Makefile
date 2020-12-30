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
down:
	docker-compose down
down-v:
	docker-compose down -v
down-all:
	docker-compose down --rmi all --volumes --remove-orphans
ps:
	docker-compose ps
restart:
	docker-compose restart
logs:
	docker-compose logs $(arg)
logs-tail:
	docker-compose logs -f --tail=500 $(arg)

# general -------
init:
	export STAGE=$(STAGE)

