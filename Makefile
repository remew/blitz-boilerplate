.PHONY: migrate
migrate:
	docker-compose exec app yarn migrate

.PHONY: seed
seed:
	docker-compose exec app yarn seed

.PHONY: reset
reset:
	docker-compose exec app yarn reset
