from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.


class CoursesList(models.Model):
    COURSE_SEMESTER_TYPE = (('Spring', 'Spring'), ('Fall', 'Fall'),
                            ('Summer1', 'Summer1'), ('Summer2', 'Summer2'))
    courseID = models.CharField('courseID', primary_key=True, max_length=10, default=' ')
    courseSemester = models.CharField('course semester', max_length=10, choices=COURSE_SEMESTER_TYPE,
                                      default='Spring')
    courseYear = models.IntegerField('course year', default=2023)
    courseName = models.CharField('course name', max_length=40, default=' ')
    courseDescription = models.TextField('course description', default=' ')
    courseZoomlink = models.CharField('course zoom link', max_length=100,
                                      default='https://bu-metcollege.zoom.us/j/97326542525?pwd'
                                              '=b01CcGppWE1HVWY2dHdldDQ4Nk4wZz09#success')
    Syllabus_Week1 = models.CharField('week 1', max_length=30, default='week 1 session')
    Syllabus_Week2 = models.CharField('week 1', max_length=30, default='week 2 session')
    Syllabus_Week3 = models.CharField('week 1', max_length=30, default='week 3 session')
    Syllabus_Week4 = models.CharField('week 1', max_length=30, default='week 4 session')
    Syllabus_Week5 = models.CharField('week 1', max_length=30, default='week 5 session')
    Syllabus_Week6 = models.CharField('week 1', max_length=30, default='week 6 session')
    Syllabus_Week7 = models.CharField('week 1', max_length=30, default='mid-term exam')
    Syllabus_Week8 = models.CharField('week 1', max_length=30, default='week 8 session')
    Syllabus_Week9 = models.CharField('week 1', max_length=30, default='week 9 session')
    Syllabus_Week10 = models.CharField('week 1', max_length=30, default='week 10 session')
    Syllabus_Week11 = models.CharField('week 1', max_length=30, default='week 11 session')
    Syllabus_Week12 = models.CharField('week 1', max_length=30, default='final exam')
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



