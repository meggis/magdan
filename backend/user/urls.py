from django.urls import path

from user.views.details_view import DetailsView

urlpatterns = [
    path("details/", DetailsView.as_view(), name="user"),
]
