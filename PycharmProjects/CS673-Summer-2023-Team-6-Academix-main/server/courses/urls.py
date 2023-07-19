from . import views
from django.urls import path


urlpatterns = [
    path('list/', views.course_list, name='course_list'),
    path('detail/<str:pk>/',  views.course_detail, name="course_detail")
]