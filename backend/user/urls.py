from django.urls import path

from user.views.details_view import DetailsView
from user.views.logout_view import LogoutView

urlpatterns = [
    path("details/", DetailsView.as_view(), name="user"),
    path("logout/", LogoutView.as_view(), name="user"),
]
