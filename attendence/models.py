from django.db import models
from django.conf import settings
from django.utils import timezone

from courses.models import CoursesList
# Create your models here.


class Attendance(models.Model):

    courseID = models.ForeignKey(CoursesList, on_delete=models.CASCADE)
    title = models.CharField('title', max_length=40, default='attendance')
    created_date = models.DateTimeField('created date', default=timezone.now)
    valid_time = models.IntegerField('valid time interval/min', default=10)
    total_number = models.IntegerField('total number of students', default=1)
    attended_number = models.IntegerField('total number of students', default=0)

    class Meta:
        verbose_name = "attendance list for a course"
        verbose_name_plural = verbose_name
        ordering = ("courseID",)


class AttendanceRecord(models.Model):

    attendanceID = models.ForeignKey(Attendance, on_delete=models.CASCADE)
    studentID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    if_attended = models.BooleanField("if attended", default=False)
    token_key = models.CharField("token for verification", max_length=10)

    class Meta:
        verbose_name = "attendance record"
        verbose_name_plural = verbose_name
        ordering = ("attendanceID",)





