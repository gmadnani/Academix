import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Segment, Header, Button, Dropdown, Form } from 'semantic-ui-react';
import { fetchUsers } from '../store/actions/user';
import { fetchCourses } from '../store/actions/course';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AdminCourseRegisteration = ({
  users,
  courses,
  fetchUsers,
  fetchCourses,
  token,
}) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchUsers(token);
    fetchCourses(token);
  }, [fetchUsers, fetchCourses, token]);

  const handleCourseChange = (event, data) => {
    setSelectedCourse(data.value);
  };

  const handleStudentChange = (event, data) => {
    setSelectedStudent(data.value);
  };

  const handleRegister = () => {
    if (selectedCourse && selectedStudent) {
      const courseNumber = selectedCourse;
      const userData = [{ userID: selectedStudent }];

      axios.post(`http://127.0.0.1:8000/courses/admin/${courseNumber}/`, userData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setSuccessMessage('Student registered successfully.');
        setTimeout(() => {
          setSuccessMessage('');
          history.push('/home');
        }, 2000);
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
    }
  };

  return (
    <div>
      <Header as="h3" textAlign="center">
        Admin Course Registration
      </Header>
      <Segment>
        <Form>
          <Form.Field>
            <label>Select Course</label>
            <Dropdown
              placeholder="Select Course"
              fluid
              search
              selection
              options={courses.map((course) => ({
                key: course.courseID,
                value: course.courseID,
                text: course.courseName,
              }))}
              value={selectedCourse}
              onChange={handleCourseChange} 
            />
          </Form.Field>
          <Form.Field>
            <label>Select Student</label>
            <Dropdown
              placeholder="Select Student"
              fluid
              search
              selection
              options={users.map((user) => ({
                key: user.id,
                value: user.email,
                text: user.owner,
              }))}
              value={selectedStudent}
              onChange={handleStudentChange}
            />
          </Form.Field>
          <Button onClick={handleRegister} primary>
            Register Student
          </Button>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </Form>
      </Segment>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.user.users,
    courses: state.course.courses,
    token: state.auth.token,
  };
};

const mapDispatchToProps = {
  fetchUsers,
  fetchCourses,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCourseRegisteration);
