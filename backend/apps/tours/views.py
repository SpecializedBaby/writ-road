from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework import status, generics, mixins
from rest_framework.response import Response

from apps.tours.models.tour import Tour
from apps.tours.serializers.country import CountryListSerializer, CountryDetailSerializer
from apps.tours.models.country import Country
from apps.tours.serializers.tour import TourListSerializer


class CountryList(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Country.objects.all()

    def get_serializer_class(self):
        # if self.request.method == "POST":
        #     return CountryListSerializer
        return CountryListSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class CountryDetail(
    generics.GenericAPIView,
    mixins.RetrieveModelMixin
):

    queryset = Country.objects.all()
    serializer_class = CountryDetailSerializer

    def get(self, request, *args, **kwargs) -> Response:
        return self.retrieve(request, *args, **kwargs)


class TourListView(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Tour.objects.all()
    serializer_class = TourListSerializer

    def get(self, request, *args, **kwargs) -> Response:
        return self.list(request, *args, **kwargs)
