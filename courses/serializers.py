from django.contrib.auth.models import User
from rest_framework import serializers
from .models import CoursesList, CourseRegistration


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = CoursesList
        fields = '__all__'


class CourseRegistrationSerializer(serializers.ModelSerializer):
    userID = serializers.ReadOnlyField(source="userID.email")

    class Meta:
        model = CourseRegistration
        fields = '__all__'

