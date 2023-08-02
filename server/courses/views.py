from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import User

from .models import CoursesList, CourseRegistration
from .serializers import CourseSerializer, CourseRegistrationSerializer
from users.models import UserProfile


@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def course_list(request):
    if request.method == "GET":
        course_data = CoursesList.objects.filter(Q(courseregistration__userID=request.user))
        s = CourseSerializer(instance=course_data, many=True)
        return Response(data=s.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        current_user = UserProfile.objects.get(owner=request.user)
        s = CourseSerializer(data=request.data, partial=True)
        course_id = request.data['courseID']
        if current_user.role == 'teacher':
            if s.is_valid():
                s.save(owner=request.user)
                record = {'courseID': course_id, 'course_role': 'teacher'}
                ss_1 = CourseRegistrationSerializer(data=record, partial=True)
                ss_2 = CourseRegistrationSerializer(data=record, partial=True)
                if ss_1.is_valid():
                    ss_1.save(userID=request.user)
                if ss_2.is_valid():
                    admin = User.objects.get(username='admin')
                    ss_2.save(userID=admin)
                return Response(data=s.data, status=status.HTTP_201_CREATED)
            return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes((IsAuthenticated,))
def course_detail(request, pk):
    try:
        course = CoursesList.objects.get(pk=pk)

    except CoursesList.DoesNotExist:
        return Response(data={"msg": "No information of this course"}, status=status.HTTP_404_NOT_FOUND)
    else:
        if request.method == "GET":
            s = CourseSerializer(instance=course)
            return Response(data=s.data, status=status.HTTP_200_OK)

        elif request.method == "PUT":
            try:
                course_registration = CourseRegistration.objects.get(userID=request.user, courseID=course.courseID)
            except CourseRegistration.DoesNotExist:
                return Response(data={"msg": "You have no authority"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                s = CourseSerializer(instance=course, data=request.data)
                if s.is_valid():
                    s.save()
                    return Response(data=s.data, status=status.HTTP_200_OK)
                return Response(data=s.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == "DELETE":
            if course.owner == request.user:
                course.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(data={"msg": "You have no authority"}, status=status.HTTP_401_UNAUTHORIZED)
