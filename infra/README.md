## When server starts
1. cd /.ssh
2. touch id_rsa.pub
3. cp id_rsa
4. git clone git@github.com:MacieJCzarkowskI/magdan.git

## scripts
1. bash new_env_script.sh
2. python3 manage.py createsuperuser
3. nohup python3 manage.py runserver 0.0.0.0:8000 & or (python3 manage.py runserver 0.0.0.0:8000)
