from . import views
from django.urls import path


urlpatterns = [
    path('<str:pk>/assignment/list/', views.assignment_list, name='assignment_list'),
    path('<str:pk>/<str:pk2>/detail/',  views.assignment_detail, name="assignment_detail"),
    path('<str:pk>/assignment/add/', views.add_assignment, name='add_assignment'),
    path('<str:pk>/<str:pk2>/submission/', views.assignment_submission_view, name='assignment_submission'),
    path('<str:pk>/<str:pk2>/submissions/all/', views.teacher_submissions_view, name='teacher_submissions_view'),
    path('<str:pk>/<str:pk2>/submissions/<str:pk3>/', views.submissions_details, name='subm00issions_details'),
    path('<str:pk>/<str:pk2>/grades/', views.view_course_grades, name='view_course_grades')
]       