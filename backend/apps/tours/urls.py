from django.urls import path

from apps.tours.views import CountryList, CountryDetail, TourListView, TourDetailView, DestinationListView, \
    DestinationDetailView

app_name = "apps.tours"

urlpatterns = [
    path('countries/', CountryList.as_view(), name="country_list"),
    path("country/<int:pk>/", CountryDetail.as_view(), name="country_detail"),
    path("tours", TourListView.as_view(), name="tour_list"),
    path("tour/<int:pk>/", TourDetailView.as_view(), name="tour_detail"),
    path("destinations/", DestinationListView.as_view(), name="destination_list"),
    path("destinations/<int:pk>/", DestinationDetailView.as_view(), name="destination_detail")
]
