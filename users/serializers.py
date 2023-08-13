from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField(source="owner.email")
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = UserProfile
        fields = '__all__'


class RoleManagementSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = UserProfile
        fields = ('owner', 'role')
