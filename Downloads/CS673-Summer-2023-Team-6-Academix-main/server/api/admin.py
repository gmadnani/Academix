from django.contrib import admin

from .models import Choice, Question, Assignment, GradedAssignment, AssignmentSubmission

admin.site.register(Choice)
admin.site.register(Question)
admin.site.register(Assignment)
admin.site.register(GradedAssignment)
admin.site.register(AssignmentSubmission)