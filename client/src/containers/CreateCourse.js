import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { createCourse } from '../store/actions/course';
import { useHistory } from 'react-router-dom';

const CreateCourseForm = ({ token, creatingCourse, createCourseError, createCourse }) => {
    const history = useHistory();
    const [courseData, setCourseData] = useState({
        courseID: '',
        courseName: '',
        courseDescription: '',
        Syllabus_Week1: '',
        Syllabus_Week2: '',
        Syllabus_Week3: '',
        Syllabus_Week4: '',
        Syllabus_Week5: '',
        Syllabus_Week6: '',
        Syllabus_Week7: '',
        Syllabus_Week8: '',
        Syllabus_Week9: '',
        Syllabus_Week10: '',
        Syllabus_Week11: '',
        Syllabus_Week12: '',
    });

  const handleChange = (e, { name, value }) => {
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = () => {
    createCourse(token, courseData);
    history.push('/courseList');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label="Course ID"
        name="courseID"
        value={courseData.courseID}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Course Name"
        name="courseName"
        value={courseData.courseName}
        onChange={handleChange}
        required
      />
      <Form.TextArea
        label="Course Description"
        name="courseDescription"
        value={courseData.courseDescription}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Week 1 Syllabus"
        name="Syllabus_Week1"
        value={courseData.Syllabus_Week1}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Week 2 Syllabus"
        name="Syllabus_Week2"
        value={courseData.Syllabus_Week2}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Week 3 Syllabus"
        name="Syllabus_Week3"
        value={courseData.Syllabus_Week3}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Week 4 Syllabus"
        name="Syllabus_Week4"
        value={courseData.Syllabus_Week4}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Week 5 Syllabus"
        name="Syllabus_Week5"
        value={courseData.Syllabus_Week5}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Week 6 Syllabus"
        name="Syllabus_Week6"
        value={courseData.Syllabus_Week6}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Week 7 Syllabus"
        name="Syllabus_Week7"
        value={courseData.Syllabus_Week7}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Week 8 Syllabus"
        name="Syllabus_Week8"
        value={courseData.Syllabus_Week8}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Week 9 Syllabus"
        name="Syllabus_Week9"
        value={courseData.Syllabus_Week9}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Week 10 Syllabus"
        name="Syllabus_Week10"
        value={courseData.Syllabus_Week10}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Week 11 Syllabus"
        name="Syllabus_Week11"
        value={courseData.Syllabus_Week11}
        onChange={handleChange}
        required
      />
      <Form.Input
        label="Week 12 Syllabus"
        name="Syllabus_Week12"
        value={courseData.Syllabus_Week12}
        onChange={handleChange}
        required
      />

      <Button type="submit" loading={creatingCourse} disabled={creatingCourse}>
        Create Course
      </Button>
      {createCourseError && (
        <p>Error creating course: {createCourseError.message}</p>
      )}
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    creatingCourse: state.course.creatingCourse,
    createCourseError: state.course.createCourseError,
  };
};

const mapDispatchToProps = {
  createCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourseForm);