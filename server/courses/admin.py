from django.contrib import admin
from .models import CourseList
# Register your models here.


@admin.register(CourseList)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("courseID", "courseName", "userID")
    search_fields = list_display
    list_filter = list_display
