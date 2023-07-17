from django.db import models
from django.conf import settings

from courses.models import CourseList


class Assignment(models.Model):
    title = models.CharField(max_length=50)
    # teacher = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    courseId = models.ForeignKey(CourseList, on_delete=models.CASCADE)
    due_date = models.DateTimeField(verbose_name="due date")
    full_grade = models.IntegerField()

    def __str__(self):
        return self.title


class GradedAssignment(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    assignment = models.ForeignKey(
        Assignment, on_delete=models.SET_NULL, blank=True, null=True)
    grade = models.FloatField()

    def __str__(self):
        return self.student.username


class Choice(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Question(models.Model):
    question = models.CharField(max_length=200)
    choices = models.ManyToManyField(Choice)
    answer = models.ForeignKey(
        Choice, on_delete=models.CASCADE, related_name='answer', blank=True, null=True)
    assignment = models.ForeignKey(
        Assignment, on_delete=models.CASCADE, related_name='questions', blank=True, null=True)
    order = models.SmallIntegerField()

    def __str__(self):
        return self.question
