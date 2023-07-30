from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Assignment, AssignmentSubmission, AssignmentGrading 
from courses.models import CoursesList, CourseRegistration
from .serializers import AssignmentSerializer, SubmissionSerializer, AssignmentGradingSerializer
from users.models import UserProfile
from .forms import AssignmentForm, AssignmentGradingForm, AssignmentSubmissionForm
from django.shortcuts import render


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def assignment_list(request, pk):
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
    if user.role == 'teacher':
        form = AssignmentForm(request.POST, request.FILES)
        if form.is_valid():
            form.instance.courseId = courseid
            form.save()       
        else:
            form = AssignmentForm(request.POST, request.FILES) 
    return render(request, 'api/assignment_form.html', {'form': form})

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
                form = AssignmentForm(request.POST, request.FILES, instance=assignment)
                if form.is_valid():
                    form.instance.courseId = courseid
                    form.save()  
                    return Response(status=status.HTTP_202_ACCEPTED) 
                return render(request, 'api/assignment_form.html', {'form': form})
        
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
        form = AssignmentSubmissionForm(request.POST, request.FILES)
        if form.is_valid():
            form.instance.student = request.user
            form.instance.assignmentID = pk2
            form.instance.courseID = pk
            form.save()       
        else:
            form = AssignmentSubmissionForm(request.POST, request.FILES) 
        return render(request, 'api/assignment_submission_form.html', {'form': form})

@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def teacher_submissions_view(request, pk, pk2):
    if request.method == 'GET':
        submission = AssignmentSubmission.objects.filter(courseID=pk, assignmentID=pk2)
        s = SubmissionSerializer(instance = submission, many=True)
        return Response(data=s.data, status=status.HTTP_200_OK)
    
@api_view(["GET", "POST"])
@permission_classes((IsAuthenticated,))
def submissions_details(request, pk, pk2, pk3):
    if request.method == 'GET':
        student = User.objects.get(username=pk3)
        submission = AssignmentSubmission.objects.filter(courseID=pk, assignmentID=pk2, student=student)
        s = SubmissionSerializer(instance = submission, many=True)
        return Response(data=s.data, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        form = AssignmentGradingForm(request.POST)
        if form.is_valid():
            form.instance.student = User.objects.get(username=pk3)
            form.instance.assignmentID = pk2
            form.instance.courseID = pk
            form.save()
        else:
            form = AssignmentGradingForm(request.POST)
        return render(request, 'api/assignment_grading.html', {'form' : form})
            
    
 
        