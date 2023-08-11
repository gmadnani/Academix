from django.test import TestCase
from django.contrib.auth.models import User
from .models import CoursesList

# Create your tests here.
class CoursesListTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        print("--Courses Test Cases--")
        # Create a test user for the ForeignKey relationship
        cls.test_user = User.objects.create_user(username='testuser', password='testpassword')
        cls.other_user = User.objects.create_user(username='TestUser', password='testpassword')
        # Create a test CoursesList instance
        cls.course = CoursesList.objects.create(
            courseID='CS101',
            courseName='Intro to CS',
            courseDescription='An introductory course to Computer Science',
            owner=cls.test_user
        )

    def test_course_id(self):
        print("Test: Verifying Course ID")
        course = CoursesList.objects.get(courseID='CS101')
        self.assertEqual(course.courseID, 'CS101')
        self.assertNotEqual(course.courseID, 'CS1o1')

    def test_course_name(self):
        print("Test: Verifying Course Name")
        course = CoursesList.objects.get(courseID='CS101')
        self.assertEqual(course.courseName, 'Intro to CS')
        self.assertNotEqual(course.courseName, 'Intro to Cs')
        
    def test_course_description(self):
        print("Test: Verifying Course Description")
        course = CoursesList.objects.get(courseID='CS101')
        self.assertEqual(course.courseDescription, 'An introductory course to Computer Science')
        self.assertNotEqual(course.courseDescription, 'An introductory course to computer science')
    
    def test_course_owner(self):
        print("Test: Verifying Course Owner")
        course = CoursesList.objects.get(courseID='CS101')
        self.assertEqual(course.owner, self.test_user)
        self.assertNotEqual(course.owner, self.other_user)