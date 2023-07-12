from django.contrib.auth.models import User
from rest_framework import serializers
from .models import CourseList


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    #userID = serializers.ReadOnlyField(source="userID.username")

    class Meta:
        model = CourseList
        fields = '__all__'
