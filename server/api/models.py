from django.db import models
from users.models import UserProfile

class Course(models.Model):
    title = models.CharField(max_length=50)
    teacher = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title
    
class Assignment(models.Model):
    title = models.CharField(max_length=50)
    
    def __str__(self):
        return self.title
    
class Grade(models.Model):
    student = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    assignment = models.ForeignKey(Course, on_delete=models.SET_NULL, blank=True, null=True)
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
    answer = models.ForeignKey(Choice, on_delete=models.CASCADE, related_name= 'answer')
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    order = models.SmallIntegerField()
    
    def __str__(self):
        return self.question