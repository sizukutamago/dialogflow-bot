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

# gcloud -------

gcr-push:
	export STAGE=$(STAGE)
	export PROJECT=$(PROJECT)
	gcloud builds submit \
  --project="$(PROJECT)" \
  --config cloudbuild.yml
gcr-deploy:
	export STAGE=$(STAGE)
	export SERVICE_NAME=$(SERVICE_NAME)
	export PROJECT=$(PROJECT)
	gcloud run deploy $(SERVICE_NAME) \
  --project="$(PROJECT)" \
  --image="gcr.io/$(PROJECT)/$(SERVICE_NAME)/$(STAGE)" \
  --platform=managed \
  --region=asia-northeast1 \
  --allow-unauthenticated
gcr-open:
	open https://console.cloud.google.com/run?hl=ja&project=$(PROJECT)

# general -------
init:
	export STAGE=$(STAGE)

