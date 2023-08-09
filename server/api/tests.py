from django.test import TestCase
from django.contrib.auth.models import User
from datetime import datetime,timedelta
from django.contrib.auth import get_user_model
from .models import Assignment, GradedAssignment, Choice, Question, AssignmentSubmission, AssignmentGrading
from django.utils import timezone
from courses.models import CoursesList

User = get_user_model()

class AssignmentTestCase(TestCase):
    def setUp(self):
        print("--Assignment Test Cases--")
        self.user = User.objects.create_user(
            username='testuser', password='testpassword'
        )
        self.course = CoursesList.objects.create(
            courseName='Intro to CS', 
            courseDescription='An introductory course to Computer Science', 
            owner=User.objects.create_user(username="professor",password="122345")
        )
        self.due_date = timezone.now() + timedelta(days=7)
        self.assignment = Assignment.objects.create(
            title='Test Assignment',
            courseId=self.course,
            due_date=self.due_date,
            full_grade=100,
            assignment_files='test_file.txt',
        )

    def test_assignment_creation(self):
        print("Test: Assignment Creation")
        assignment = Assignment.objects.get(title='Test Assignment')
        self.assertEqual(assignment.courseId, self.course)
        self.assertEqual(assignment.due_date, self.due_date)
        self.assertEqual(assignment.full_grade, 100)
        self.assertEqual(str(assignment), 'Test Assignment')

class GradedAssignmentTestCase(TestCase):
    def setUp(self):
        print("--Graded Assignment Test Cases--")
        self.user = User.objects.create_user(
            username='testuser', password='testpassword'
        )
        self.course = CoursesList.objects.create(
            courseName='Intro to CS', 
            courseDescription='An introductory course to Computer Science',
            owner=User.objects.create_user(username="professor",password="122345")
        )
        self.due_date = timezone.now() + timedelta(days=7)
        self.assignment = Assignment.objects.create(
            title='Test Assignment',
            courseId=self.course,
            due_date=self.due_date,
            full_grade=100,
            assignment_files='test_file.txt',
        )
        self.graded_assignment = GradedAssignment.objects.create(
            student=self.user, assignment=self.assignment, grade=95
        )

    def test_graded_assignment_creation(self):
        print("Test: Graded Assignment Creation")
        graded_assignment = GradedAssignment.objects.get(student=self.user)
        self.assertEqual(graded_assignment.assignment, self.assignment)
        self.assertEqual(graded_assignment.grade, 95)
        self.assertEqual(str(graded_assignment), 'testuser')
        