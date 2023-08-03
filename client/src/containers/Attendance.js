import React, { Component, useState, useEffect  } from 'react';
import { connect } from "react-redux";
import { fetchCourses } from "../store/actions/course";
import { Card, CardContent, List, Grid, Segment, Form, Button, Modal, Message,Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { createAttendance } from '../store/actions/attendance';

const Attendance = ({ token, courseID, createAttendance }) => {
  const [title, setTitle] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [validTime, setValidTime] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage) {
      // Hide the success message after 3 seconds (adjust the time as needed)
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleCreateAttendance = () => {
    createAttendance(token, courseID, title, createdDate, validTime)
      .then(() => {
        setShowForm(false);
        setShowSuccessMessage(true);
      })
      .catch((error) => {
        // Handle the error here if needed
        console.error('Error creating attendance:', error);
      });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowSuccessMessage(false);
    setTitle('');
    setCreatedDate('');
    setValidTime('');
  };

  return (
    <div>
      <Button onClick={() => setShowForm(true)} primary>
        Create Attendance
      </Button>
      <Modal open={showForm} onClose={handleCloseForm} closeIcon>
        <Modal.Header>
          Create Attendance
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Created Date (format: "YYYY-MM-DD HH:mm:ss")</label>
              <input
                type="text"
                placeholder="Enter Created Date"
                value={createdDate}
                onChange={(event) => setCreatedDate(event.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Valid Time (in minutes)</label>
              <input
                type="number"
                placeholder="Enter Valid Time"
                value={validTime}
                onChange={(event) => setValidTime(event.target.value)}
              />
            </Form.Field>
            <Button onClick={handleCreateAttendance} primary>
              Create
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
      {showSuccessMessage && (
        <Message success header="Attendance Successfully Posted" content="Attendance has been created successfully!" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  courses: state.course.courses,
  loading: state.course.loading,
  error: state.course.error,
  courseID: localStorage.getItem('course'),
});

const mapDispatchToProps = (dispatch) => ({
  createAttendance: (token, courseID, title, createdDate, validTime) =>
    dispatch(createAttendance(token, courseID, title, createdDate, validTime)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);
