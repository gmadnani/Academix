from django.contrib import admin
from .models import CoursesList, CourseRegistration
# Register your models here.


@admin.register(CoursesList)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("courseID", "courseName")
    search_fields = list_display
    list_filter = list_display


@admin.register(CourseRegistration)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("courseID",  "userID")
    search_fields = list_display
    list_filter = list_display

