from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from . import settings, views

urlpatterns = [
    path("grappelli/", include("grappelli.urls")),
    path('admin/', admin.site.urls),
    path('user/',include('user.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += staticfiles_urlpatterns()
