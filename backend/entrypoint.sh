#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
        sleep 0.1
    done

    echo "PostgreSQL started"

    # Check if certain tables exist in the database
    if psql -h $SQL_HOST -U $SQL_USER -d $SQL_DATABASE -c '\dt some_table_name' | grep -q "some_table_name"; then
        echo "Database already has data. Skipping flush."
    else
        echo "Flushing the database..."
        python manage.py flush --no-input
        python manage.py migrate
        python manage.py loaddata ../infra/data.json

    fi
fi


exec "$@"

