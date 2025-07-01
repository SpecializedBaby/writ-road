from django.urls import path

from apps.tours.views import CountryList, CountryDetail


app_name = "apps.tours"

urlpatterns = [
    path('countries/', CountryList.as_view(), name="country_list"),
    path("country/<int:pk>/", CountryDetail.as_view(), name="country_detail")
]
