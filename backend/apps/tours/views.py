from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework import status, generics, mixins
from rest_framework.response import Response

from apps.tours.serializers import CountryListSerializer, CountryDetailSerializer
from apps.tours.models.country import Country


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
