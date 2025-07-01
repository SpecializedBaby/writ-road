from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework import status
from rest_framework.response import Response

from apps.tours.serializers import CountrySerializer
from apps.tours.models import Country


@api_view(["GET", "POST"])
def country_list(request):
    if request.method == "GET":
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        serializer = CountrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create your views here.
@api_view(["GET", "PUT", "DELETE"])
def country_detail(request, pk):
    country = get_object_or_404(Country, pk=pk)
    if request.method == "GET":
        serializer = CountrySerializer(country)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        serializer = CountrySerializer(country, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        country.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

