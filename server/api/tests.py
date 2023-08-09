from django.test import TestCase
from datetime import datetime, timedelta
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from django.utils import timezone  # Import timezone module
from .models import Assignment, CoursesList

# Create your tests here
User = get_user_model()

class AssignmentTestCase(TestCase):
    def setUp(self):
        self.course = CoursesList.objects.create(
            courseID="CS101",
            courseSemester="Spring",
            courseYear=2023,
            courseName="Introduction to Computer Science",
            courseDescription="An introductory course to programming.",
            owner=User.objects.create_user(username="teacher1", password="teacherpass")
        )
        self.due_date = timezone.now() + timedelta(days=7)
        self.assignment = Assignment.objects.create(
            title="Test Assignment",
            courseId=self.course,
            due_date=self.due_date,
            full_grade=100,
            assignment_files=SimpleUploadedFile("test_file.txt", b"file_content"),
        )

def test_assignment_creation(self):
    self.assertEqual(self.assignment.title, "Test Assignment")
    self.assertEqual(self.assignment.courseId, self.course)
    self.assertEqual(self.assignment.due_date, self.due_date)
    self.assertEqual(self.assignment.full_grade, 100)
    
    expected_file_name_prefix = "uploads/test_file_"
    self.assertTrue(self.assignment.assignment_files.name.startswith(expected_file_name_prefix))

    def test_assignment_str(self):
        self.assertEqual(str(self.assignment), "Test Assignment")
