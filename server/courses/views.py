from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import User

from .models import CoursesList, CourseRegistration
from .serializers import CourseSerializer, CourseRegistrationSerializer
from users.models import UserProfile


@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def course_list(request):

    if request.user.is_superuser:
        if request.method == "GET":
            course_data = CoursesList.objects.all()
            s = CourseSerializer(instance=course_data, many=True)
            return Response(data=s.data, status=status.HTTP_200_OK)
        if request.method == "POST":
            current_user = UserProfile.objects.get(owner=request.user)
            s = CourseSerializer(data=request.data, partial=True)
            course_id = request.data['courseID']
            owner_id = request.data['owner']
            owner = User.objects.get(username=owner_id)
            if current_user.role == 'admin':
                if s.is_valid():
                    s.save(owner=owner)
                    record = {'courseID': course_id, 'course_role': 'teacher'}
                    ss_1 = CourseRegistrationSerializer(data=record, partial=True)
                    ss_2 = CourseRegistrationSerializer(data=record, partial=True)
                    if ss_1.is_valid():
                        ss_1.save(userID=owner)
                    if ss_2.is_valid():
                        admin = User.objects.get(username='admin')
                        ss_2.save(userID=admin)
                    return Response(data=s.data, status=status.HTTP_201_CREATED)
                return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)

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
            if course.owner == request.user or request.user.is_superuser:
                course.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(data={"msg": "You have no authority"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET", "POST", "DELETE"])
@permission_classes((IsAdminUser,))
def manage_registration(request, pk):
    try:
        registration = CourseRegistration.objects.filter(courseID=pk)
    except CourseRegistration.DoesNotExist:
        return Response(data={"msg": "No information of this course"}, status=status.HTTP_404_NOT_FOUND)
    else:

        if request.method == "GET":
            ss = CourseRegistrationSerializer(instance=registration, many=True)
            return Response(data=ss.data, status=status.HTTP_200_OK)

        if request.method == "POST":
            course = CoursesList.objects.get(pk=pk)
            for i in request.data:
                i['userID'] = User.objects.get(email=i['userID'])
                registration_record = CourseRegistration.objects.filter(courseID=course, userID=i['userID'])
                if registration_record.count() == 0:
                    print(i)
                    ss = CourseRegistrationSerializer(data=i, partial=True)
                    if ss.is_valid():
                        ss.save(userID=i['userID'], courseID=course)
                    else:
                        return Response(data={"msg": "Error"}, status=status.HTTP_400_BAD_REQUEST)

            return Response(data={"msg": "Saving successful"}, status=status.HTTP_201_CREATED)

        if request.method == "DELETE":
            course = CoursesList.objects.get(pk=pk)
            for i in request.data:
                i['userID'] = User.objects.get(email=i['userID'])
                registration_record = CourseRegistration.objects.filter(courseID=pk, userID=i['userID'])
                if registration_record.exists:
                    registration_record.delete()
            return Response(data={"msg": "Delete successful"}, status=status.HTTP_200_OK)






