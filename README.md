1. install docker
2. docker-compose up -d --build
3. docker-compose run api python manage.py runserver 0.0.0.0:8000
4. docker logs --tail 1000 -f  magdan-api-1  (logs)