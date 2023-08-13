from rest_framework import serializers

from users.models import UserProfile
from .models import Assignment, Question, Choice, GradedAssignment, AssignmentSubmission, AssignmentGrading


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class QuestionSerializer(serializers.ModelSerializer):
    choices = StringSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'choices', 'question', 'order')


class AssignmentSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    teacher = StringSerializer(many=False)
    class Meta:
        model = Assignment
        fields = '__all__'

    def get_questions(self, obj):
        questions = QuestionSerializer(obj.questions.all(), many=True).data
        return questions

    def create(self, request):
        data = request

        assignment = Assignment()
        assignment.title = data['title']
        assignment.due_date = data['due_date']
        assignment.full_grade = data['full_grade']
        assignment.courseId = data['courseId']
        # assignment.assignment_files = data['assignment_files']
        assignment.save()
        return assignment


class GradedAssignmentSerializer(serializers.ModelSerializer):
    student = StringSerializer(many=False)

    class Meta:
        model = GradedAssignment
        fields = '__all__'

    def create(self, request):
        data = request.data
        print(data)

        assignment = Assignment.objects.get(id=data['asntId'])
        student = UserProfile.objects.get(username=data['username'])

        graded_asnt = GradedAssignment()
        graded_asnt.assignment = assignment
        graded_asnt.student = student
        graded_asnt.save()
        return graded_asnt
    
class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentSubmission
        fields = '__all__'
        
    def create(self, request):
        data = request.data
        
        submission = AssignmentSubmission()
        submission.assignmentID = data['assignmentID']
        submission.student = UserProfile.objects.get(username=data['student'])
        submission.title = data['title']
        submission.description = data['description']
        submission.file = data['file']
        submission.submission_date = data['submission_date']
        submission.save()
        return submission

class AssignmentGradingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentGrading
        fields = '__all__'
        
    def create(self, request):
        data = request.data
        
        grading = AssignmentGrading()
        grading.assignmentID = data['assignmentID']
        grading.student = UserProfile.objects.get(username = data['student'])
        grading.courseID = data['courseID']
        grading.grade = data['grade']
        
        return grading