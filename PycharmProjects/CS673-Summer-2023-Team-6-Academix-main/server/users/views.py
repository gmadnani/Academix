from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import User


from .models import UserProfile
from .serializers import UserProfileSerializer


@api_view(["GET", "POST", "PUT"])
@permission_classes((IsAuthenticated,))
def get_profile(request):
    if request.method == "GET":
        try:
            personal_profile = UserProfile.objects.get(owner=request.user)
        except UserProfile.DoesNotExist:
            return Response(data={'msg': "not found"}, status=status.HTTP_404_NOT_FOUND)
        s = UserProfileSerializer(instance=personal_profile)
        return Response(data=s.data, status=status.HTTP_200_OK)
    if request.method == "POST":
        try:
            personal_profile = UserProfile.objects.get(owner=request.user)
        except UserProfile.DoesNotExist:
            s = UserProfileSerializer(data=request.data, partial=True)
            if s.is_valid():
                s.save(owner=request.user)
                return Response(data=s.data, status=status.HTTP_200_OK)
            return Response(data={'msg': "save profile failed"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={'msg': "profile already exists"}, status=status.HTTP_406_NOT_ACCEPTABLE)
    if request.method == "PUT":
        try:
            personal_profile = UserProfile.objects.get(owner=request.user)
        except UserProfile.DoesNotExist:
            return Response(data={'msg': "not found"}, status=status.HTTP_404_NOT_FOUND)
        s = UserProfileSerializer(instance=personal_profile, data=request.data)
        if s.is_valid():
            s.save()
            return Response(data=s.data, status=status.HTTP_200_OK)
        return Response(data=s.errors, status=status.HTTP_400_BAD_REQUEST)
