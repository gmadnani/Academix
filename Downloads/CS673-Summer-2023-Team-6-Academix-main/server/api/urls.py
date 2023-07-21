from . import views
from django.urls import path


urlpatterns = [
    path('assignment/list/', views.assignment_list, name='assignment_list'),
    path('assignemnt/detail/<int:pk>/',  views.assignment_detail, name="assignment_detail")
]