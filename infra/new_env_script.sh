#!/bin/bash

sudo apt-get update
sudo apt install python3-pip -y
pip install django
python3 /home/ubuntu/magdan/backend/manage.py makemigrations
python3 /home/ubuntu/magdan/backend/manage.py migrate

