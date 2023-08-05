import React, { useState, useEffect  } from 'react';
import { connect } from "react-redux";
import { List, Header, Segment, Form, Button, Modal, Message} from "semantic-ui-react";
import { createAttendance, fetchAttendances } from '../store/actions/attendance';

const Attendance = ({ token, courseID, createAttendance, attendances, loading, error, fetchAttendances }) => {
  const [title, setTitle] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [validTime, setValidTime] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchAttendances(token, courseID);
  }, [fetchAttendances, token, courseID]);

  useEffect(() => {
    if (showSuccessMessage) {
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

  const handleAttendanceClick = (attendanceID) => {
    localStorage.setItem('attendanceID', attendanceID);
  };

  if (localStorage.getItem("role") == 'teacher)'){
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
      <div>
      <Header as="h3" textAlign="center">
        List of Attendances
      </Header>
      {loading ? (
        <p>Loading attendances...</p>
      ) : error ? (
        <p>Error loading attendances: {error.message}</p>
      ) : (
        <Segment>
          <List divided relaxed>
            {attendances.map((attendance) => (
              <List.Item key={attendance.id} onClick={() => handleAttendanceClick(attendance.id)}>
                <List.Content>
                  <List.Header as="a" href={`attendance/detail/${attendance.id}`}>
                    {attendance.title}
                  </List.Header>
                  <List.Description>{attendance.created_date}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      )}
    </div>
    </div>
    
  );}
  else{
    return(
    <div>
      <Header as="h3" textAlign="center">
        List of Attendances
      </Header>
      {loading ? (
        <p>Loading attendances...</p>
      ) : error ? (
        <p>Error loading attendances: {error.message}</p>
      ) : (
        <Segment>
          <List divided relaxed>
            {attendances.map((attendance) => (
              <List.Item key={attendance.id}>
                <List.Content>
                  <List.Header >
                    {attendance.Attendance_title}
                  </List.Header>
                  <List.Description>{attendance.Attendance_created_date}</List.Description>
                  {attendance.if_attended ? 'Attended' : 'Absent'}
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      )}
    </div>
  );}
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  loading: state.attendance.loading,
  attendances: state.attendance.attendances,
  error: state.attendance.error,
  courseID: localStorage.getItem('course'),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAttendances: (token, courseID) =>
    dispatch(fetchAttendances(token, courseID)),
  createAttendance: (token, courseID, title, createdDate, validTime) =>
    dispatch(createAttendance(token, courseID, title, createdDate, validTime)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);
