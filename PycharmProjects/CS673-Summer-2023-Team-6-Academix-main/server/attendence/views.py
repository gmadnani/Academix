from django.shortcuts import render
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import User
import string
import random
from datetime import datetime, timezone

from .models import Attendance, AttendanceRecord
from .serializers import AttendanceSerializer, AttendanceRecordSerializer
from courses.models import CoursesList, CourseRegistration
from users.models import UserProfile

# Create your views here.


@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def attendance_list(request, pk):
    try:
        course = CoursesList.objects.get(pk=pk)
    except CoursesList.DoesNotExist:
        return Response(data={"msg": "No such course"}, status=status.HTTP_404_NOT_FOUND)

    if course.owner != request.user:
        return Response(data={"msg": "You have no access"}, status=status.HTTP_401_UNAUTHORIZED)

    if request.method == "GET":
        attendance_data = Attendance.objects.filter(courseID=course)
        for i in attendance_data:
            i.attended_number = AttendanceRecord.objects.filter(attendanceID=i, if_attended=True).count()
            i.save()
        s = AttendanceSerializer(instance=attendance_data, many=True)
        return Response(data=s.data, status=status.HTTP_200_OK)

    if request.method == "POST":
        s = AttendanceSerializer(data=request.data, partial=True)
        students_list = CourseRegistration.objects.filter(courseID=course, course_role='student')
        total_number = students_list.count()
        if s.is_valid():
            s.save(courseID=course, total_number=total_number)

        for i in students_list:
            chars = string.digits + string.ascii_letters
            str_code = ''.join(random.sample(chars, 8))
            record = {'token_key': str_code}
            ss = AttendanceRecordSerializer(data=record, partial=True)
            if ss.is_valid():
                ss.save(attendanceID=s.instance, studentID=i.userID)
                email_address = i.userID.email
                email_title = '{}--{}--AttendanceLink'.format(course.courseID, s.instance.title)
                email_body = 'Please use the following link to activate your code：' + \
                             'http://127.0.0.1:8000/attendance/activate/{0}'.format(str_code)
                send_status = send_mail(email_title, email_body, 'academix673@gmail.com', [email_address])
                if send_status:
                    pass
        return Response(data=s.data, status=status.HTTP_200_OK)


@api_view(["GET",])
@permission_classes((IsAuthenticated,))
def activate_attendance(request, pk):
    try:
        attendance_record = AttendanceRecord.objects.get(token_key=pk)
    except AttendanceRecord.DoesNotExist:
        return Response(data={"msg": "No such record"}, status=status.HTTP_404_NOT_FOUND)

    valid_time_before = attendance_record.attendanceID.created_date
    valid_time_interval = attendance_record.attendanceID.valid_time
    if (datetime.now(timezone.utc) - valid_time_before).seconds/60 < valid_time_interval:
        attendance_record.if_attended = True
        attendance_record.save()
        return Response(data={"msg": "Check Attendance Successful"}, status=status.HTTP_200_OK)
    return Response(data={"msg": "Check Attendance Unsuccessful"}, status=status.HTTP_200_OK)






