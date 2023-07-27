from django import forms
from .models import Assignment, AssignmentSubmission
from rest_framework import request

class AssignmentForm(forms.ModelForm):
    class Meta:
        model = Assignment
        fields = ['title', 'due_date', 'full_grade', 'assignment_files']

class AssignmentSubmissionForm(forms.ModelForm):
    class Meta:
        model = AssignmentSubmission
        fields = ['title', 'description', 'file']