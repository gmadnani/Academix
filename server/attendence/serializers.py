from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Attendance, AttendanceRecord


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'


class AttendanceRecordSerializer(serializers.ModelSerializer):

    student_email = serializers.ReadOnlyField(source="studentID.email")
    student_username = serializers.ReadOnlyField(source="studentID.username")

    class Meta:
        model = AttendanceRecord
        fields = '__all__'


class AttendanceRecordStudentSerializer(serializers.ModelSerializer):
    Attendance_title = serializers.ReadOnlyField(source="attendanceID.title")
    Attendance_created_date = serializers.ReadOnlyField(source="attendanceID.created_date")

    class Meta:
        model = AttendanceRecord
        fields = '__all__'