from django.db import models
from django.conf import settings
from .validators import validate_file_extension
from courses.models import CoursesList
from django.contrib.auth.models import User

class Assignment(models.Model):
    title = models.CharField(max_length=50)
    courseId = models.ForeignKey(CoursesList, on_delete=models.CASCADE)
    due_date = models.DateTimeField(verbose_name="due date")
    full_grade = models.IntegerField()
    assignment_files = models.FileField(upload_to='uploads/', validators=[validate_file_extension])
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
    
class AssignmentSubmission(models.Model):
    assignmentID = models.IntegerField()
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    courseID = models.CharField(max_length=20)
    description = models.TextField()
    file = models.FileField(upload_to='submissions/')
    submission_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.student.username}"

class AssignmentGrading(models.Model):
    assignmentID = models.IntegerField()
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    courseID = models.CharField(max_length=20)
    grade = models.FloatField()
    
    def str(self):
        return self.grade