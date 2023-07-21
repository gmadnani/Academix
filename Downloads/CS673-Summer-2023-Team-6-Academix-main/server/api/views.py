from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Assignment
from .serializers import AssignmentSerializer

# Create your views here.
@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))

def assignment_list(request):
    if request.method == "GET":
        assignment_data = Assignment.objects.all()
        courseid = request.user
        assignment_data = assignment_data.filter(courseId=courseid)
        return Response(data = assignment_data, status=status.HTTP_200_OK)
    
    elif request.method == "POST":
        ass = AssignmentSerializer(data = request.data, partial=True)
        if ass.is_valid():
            ass.save(courseId = request.courseid)
            return Response(data=ass.data, status=status.HTTP_201_CREATED)
        return Response(ass.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET", "PUT", "DELETE"])
@permission_classes((IsAuthenticated,))

def assignment_detail(request, pk):
    try:
        assignment = Assignment.objects.get(courseId = pk)
    
    except Assignment.DoesNotExist:
        return Response(data={"msg": "Assignment does not exist!"}, status=status.HTTP_404_NOT_FOUND)
    else:
        if request.method == "GET":
            ass = AssignmentSerializer(instance=assignment)
            return Response(data = ass.data, status=status.HTTP_200_OK)
        
        elif request.method == "PUT":
            ass = AssignmentSerializer(instance=ass, data=request.data)
            if ass.is_valid():
                ass.save()
                return Response(data=ass.data, status=status.HTTP_200_OK)
            return Response(data=ass.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == "DELETE":
            ass.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)