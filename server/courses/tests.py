from django.test import TestCase
from django.contrib.auth.models import User
from .models import CoursesList

# Create your tests here.
class CoursesListTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a test user for the ForeignKey relationship
        cls.test_user = User.objects.create_user(username='testuser', password='testpassword')
        # Create a test CoursesList instance
        cls.course = CoursesList.objects.create(
            courseID='CS101',
            courseName='Intro to CS',
            courseDescription='An introductory course to Computer Science',
            owner=cls.test_user,
            # owner='teacher',
        )

    def test_course_id(self):
        course = CoursesList.objects.get(courseID='CS101')
        self.assertEqual(course.courseID, 'CS101')

    def test_course_name(self):
        course = CoursesList.objects.get(courseID='CS101')
        self.assertEqual(course.courseName, 'Intro to CS')

    def test_course_description(self):
        course = CoursesList.objects.get(courseID='CS101')
        self.assertEqual(course.courseDescription, 'An introductory course to Computer Science')

    def test_owner(self):
        course = CoursesList.objects.get(courseID='CS101')
        self.assertEqual(course.owner, self.test_user)