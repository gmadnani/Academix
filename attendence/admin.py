
from django.contrib import admin

from .models import Attendance, AttendanceRecord
# Register your models here.


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ("courseID", "title")
    search_fields = list_display
    list_filter = list_display


@admin.register(AttendanceRecord)
class AttendanceRecordAdmin(admin.ModelAdmin):
    list_display = ("attendanceID",  "studentID", "if_attended")
    search_fields = list_display
    list_filter = list_display
