from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import CourseList
from .serializers import CourseSerializer


@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def course_list(request):
    if request.method == "GET":
        course_data = CourseList.objects.all()
        username = request.user
        course_data = course_data.filter(userID=username)
        s = CourseSerializer(instance=course_data, many=True)
        return Response(data=s.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        s = CourseSerializer(data=request.data, partial=True)
        if s.is_valid():
            s.save(userID=request.user)
            return Response(data=s.data, status=status.HTTP_201_CREATED)
        return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes((IsAuthenticated,))
def course_detail(request, pk):
    try:
        course = CourseList.objects.get(pk=pk)
    except CourseList.DoesNotExist:
        return Response(data={"msg": "No information of this course"}, status=status.HTTP_404_NOT_FOUND)
    else:
        if request.method == "GET":
            s = CourseSerializer(instance=course)
            return Response(data=s.data, status=status.HTTP_200_OK)

        elif request.method == "PUT":
            s = CourseSerializer(instance=course, data=request.data)
            if s.is_valid():
                s.save()
                return Response(data=s.data, status=status.HTTP_200_OK)
            return Response(data=s.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == "DELETE":
            course.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)