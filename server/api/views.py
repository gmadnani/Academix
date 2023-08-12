from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Assignment, AssignmentSubmission, AssignmentGrading 
from courses.models import CoursesList, CourseRegistration
from .serializers import AssignmentSerializer, SubmissionSerializer, AssignmentGradingSerializer
from users.models import UserProfile
from django.shortcuts import render


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def assignment_list(request, pk):
    user = request.user
    courseid = CoursesList.objects.get(pk = pk)
    assignment_data = Assignment.objects.all()
    assignment_data = assignment_data.filter(courseId=courseid)
    s = AssignmentSerializer(instance = assignment_data, many=True)
    return Response(data = s.data, status=status.HTTP_200_OK)
    
@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def add_assignment(request, pk):
    courseid = CoursesList.objects.get(pk = pk)
    user = UserProfile.objects.get(owner=request.user)
    
    if user.role == 'teacher' or user.role== 'admin':
        ass = AssignmentSerializer(data=request.data, partial=True)
        if ass.is_valid():
            ass.save()
            return Response(data = ass.data, status=status.HTTP_201_CREATED)
        return Response(data=ass.data, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(["GET", "POST", "DELETE"])
@permission_classes((IsAuthenticated,))
def assignment_detail(request, pk, pk2):
    user = UserProfile.objects.get(owner=request.user)
    try:
        assignment = Assignment.objects.get(courseId = pk, id = pk2)
        ass = AssignmentSerializer(instance=assignment)
    except Assignment.DoesNotExist:
        return Response(data={"msg": "Assignment does not exist!"}, status=status.HTTP_404_NOT_FOUND)
    else:
        if request.method == "GET":
            ass = AssignmentSerializer(instance=assignment)
            return Response(data = ass.data, status=status.HTTP_200_OK)
        
        elif request.method == "POST":
            try:
                courseid = CoursesList.objects.get(pk = pk)
            except user.role != 'teacher':
                return Response(data={"msg": "You lack required permissions"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                ass = AssignmentSerializer(data=request.data, partial=True)
                if ass.is_valid():
                    ass.save()
                    return Response(data=ass.data, status=status.HTTP_201_CREATED)
        
        elif request.method == "DELETE":
            course = CoursesList.objects.get(pk = pk)
            if course.owner == request.user:
                assignment.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            return Response(data = {"msg": "You lack required permissions"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def assignment_submission_view(request, pk, pk2):
    if request.method == 'GET':
        submission = AssignmentSubmission.objects.all()
        submission = submission.filter(courseID=pk, assignmentID=pk2, student=request.user)
        s = SubmissionSerializer(instance = submission, many=True)
        return Response(data = s.data, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        submission = SubmissionSerializer(data = request.data, partial=True)
        if submission.is_valid():
            submission.save()
            return Response(data=submission.data, status=status.HTTP_201_CREATED)
        return Response(data=submission.data, status=status.HTTP_400_BAD_REQUEST)        

@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def teacher_submissions_view(request, pk, pk2):
    course = CoursesList.objects.get(pk = pk)
    if course.owner == request.user:
        if request.method == 'GET':
            submission = AssignmentSubmission.objects.filter(courseID=pk, assignmentID=pk2)
            s = SubmissionSerializer(instance = submission, many=True)
            return Response(data=s.data, status=status.HTTP_200_OK)
    else:
        return Response("You lack required permissions", status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def submissions_details(request, pk, pk2, pk3):
    if request.method == 'GET':
        student = User.objects.get(username=pk3)
        submission = AssignmentSubmission.objects.filter(courseID=pk, assignmentID=pk2, student=student)
        s = SubmissionSerializer(instance = submission, many=True)
        return Response(data=s.data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        grading = AssignmentGradingSerializer(data = request.data, partial=True)
        if grading.is_valid():
            grading.save()
            return Response(data = grading.data, status=status.HTTP_201_CREATED)
        return Response(data = grading.data, status = status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET"])
@permission_classes((IsAuthenticated, ))
def view_course_grades(request, pk, pk2):
    if request.method == 'GET':
        student = User.objects.get(username=pk2)
        grading = AssignmentGrading.objects.filter(courseID = pk, student=student)
        grades = AssignmentGradingSerializer(instance = grading, many=True)
        return Response(data=grades.data, status=status.HTTP_200_OK)
               
    
 
        