from django.urls import path

from apps.tours.views import CountryList, CountryDetail, TourListView

app_name = "apps.tours"

urlpatterns = [
    path('countries/', CountryList.as_view(), name="country_list"),
    path("country/<int:pk>/", CountryDetail.as_view(), name="country_detail"),
    path("tours", TourListView.as_view(), name="tour_list")
]
