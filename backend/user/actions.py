import json
from uuid import uuid4

from django.db import transaction
from django.contrib.auth.models import User
from .models import User, MagdanUser


@transaction.atomic
def import_users(batch_id=1):

    with open("/magdan/backend/user/data.json", "r") as f:
        json_data = json.load(f)

        for item in json_data:
            user = User.objects.create_user(
                username=item["username"],
                email=item["email"],
                password=User.objects.make_random_password(),
                first_name=item["display_name"],
            )
            token = str(uuid4())
            magdan_user = MagdanUser.objects.create(
                user=user,
                is_supervisor=item["is_supervisor"],
                tokens=[token],
            )

            meaning_user.display_name = (item["display_name"],)
            meaning_user.save()

            item["login"] = f'{item["username"]}@{token}'

        with open("/magdan/backend/user/data.json", "w") as f:
            json.dump(json_data, f)
    return None
