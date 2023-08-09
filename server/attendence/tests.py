from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Attendance, AttendanceRecord
from courses.models import CoursesList

# Create your tests here
User = get_user_model()

class AttendanceTestCase(TestCase):
    def setUp(self):
        # create mock course data
        self.course = CoursesList.objects.create(
            courseID="CS101",
            courseSemester="Spring",
            courseYear=2023,
            courseName="Introduction to Computer Science",
            courseDescription="An introductory course to programming.",
            courseZoomlink="https://example.com/zoomlink",
            Syllabus_Week1="Introduction to Python",
            owner=User.objects.create_user(username="teacher1", password="teacherpass")
        )
        # create mock attendance 
        self.attendance = Attendance.objects.create(
            courseID=self.course,
            title="Test Attendance",
            valid_time=10,
            total_number=2,
        )
        self.student1 = User.objects.create_user(username="student1", password="password123")
        self.student2 = User.objects.create_user(username="student2", password="password456")

    def test_attendance_creation(self):
        self.assertEqual(self.attendance.title, "Test Attendance")
        self.assertEqual(self.attendance.courseID, self.course)
        self.assertEqual(self.attendance.valid_time, 10)
        self.assertEqual(self.attendance.total_number, 2)
        self.assertEqual(self.attendance.attended_number, 0)

class AttendanceRecordTestCase(TestCase):
    def setUp(self):
        self.course = CoursesList.objects.create(
            courseID="CS101",
            courseSemester="Spring",
            courseYear=2023,
            courseName="Introduction to Computer Science",
            courseDescription="An introductory course to programming.",
            courseZoomlink="https://example.com/zoomlink",
            Syllabus_Week1="Basic Programming",
            owner=User.objects.create_user(username="teacher1", password="teacherpass")
        )
        self.attendance = Attendance.objects.create(
            courseID=self.course,
            title="Test Attendance",
            valid_time=10,
            total_number=2,
        )
        self.student1 = User.objects.create_user(username="student1", password="password123")
        self.student2 = User.objects.create_user(username="student2", password="password456")

    def test_attendance_record_creation(self):
        attendance_record = AttendanceRecord.objects.create(
            attendanceID=self.attendance,
            studentID=self.student1,
            if_attended=True,
            token_key="abc123",
        )
        self.assertEqual(attendance_record.attendanceID, self.attendance)
        self.assertEqual(attendance_record.studentID, self.student1)
        self.assertTrue(attendance_record.if_attended)
        self.assertEqual(attendance_record.token_key, "abc123")
