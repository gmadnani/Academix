from . import views
from django.urls import path


urlpatterns = [
    path('<str:pk>/', views.attendance_list, name="attendance list for one course"),
    path('activate/<str:pk>/', views.activate_attendance, name="activate attendance"),
    path('detail/<str:pk>/', views.attendance_list_detailed, name="detailed attendance information")
]
