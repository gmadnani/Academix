from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.


class CoursesList(models.Model):
    courseID = models.CharField('courseID', primary_key=True, max_length=10, default=' ')
    courseName = models.CharField('course name', max_length=40, default=' ')
    courseDescription = models.TextField('course description', default=' ')
    # created_at = models.DateTimeField(auto_now_add=True, verbose_name="created time")
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "course list"
        verbose_name_plural = verbose_name
        ordering = ("courseID",)

    def __str__(self):
        return self.courseID


class CourseRegistration(models.Model):
    COURSE_ROLE_TYPE = (('teacher', 'teacher'),
                        ('student', 'student'),
                    ('teaching assistant', 'teaching assistant'))
    courseID = models.ForeignKey(CoursesList, on_delete=models.CASCADE)
    # userID = models.ForeignKey(User, on_delete=models.CASCADE)
    userID = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course_role = models.CharField('course role', max_length=25, choices=COURSE_ROLE_TYPE, default='student')
    # created_at = models.DateTimeField(auto_now_add=True, verbose_name="created time")

    class Meta:
        verbose_name = "course registration list"
        verbose_name_plural = verbose_name
        ordering = ("courseID",)



