.PHONY: up down restart logs rebuild shell dbshell

up:
	docker-compose up -d

down:
	docker-compose down

restart: down up logs

logs:
	docker-compose logs -f

rebuild:
	docker-compose down -v
	docker-compose build --no-cache
	docker-compose up -d
	docker-compose logs -f

shell:
	docker exec -it project_mgmt-backend-1 sh

dbshell:
	docker exec -it project_mgmt-db-1 psql -U clinton -d project_mgmt
