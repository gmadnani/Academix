import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Segment, List, Header } from 'semantic-ui-react';
import { fetchAttendanceStudentList } from '../store/actions/attendance';

const AttendanceDetails = ({ token, attendanceID, studentList, loadingStudentList, errorStudentList, fetchAttendanceStudentList }) => {
  useEffect(() => {
    fetchAttendanceStudentList(token, attendanceID);
  }, [fetchAttendanceStudentList, token, attendanceID]);

  return (
    <div>
      <Header as="h3" textAlign="center">
        Student List for Attendance
      </Header>
      {loadingStudentList ? (
        <p>Loading student list...</p>
      ) : errorStudentList ? (
        <p>Error loading student list: {errorStudentList.message}</p>
      ) : (
        // Add an extra check for studentList before using map
        studentList && studentList.length > 0 ? (
          <Segment>
            <List divided relaxed>
              {studentList.map((student) => (
                <List.Item key={student.student_email}>
                  <List.Content>
                    <List.Header>{student.student_username}</List.Header>
                    <List.Description>
                      {student.student_email} - {student.if_attended ? 'Attended' : 'Absent'}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        ) : (
          <p>No students found for this attendance.</p>
        )
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    attendanceID: localStorage.getItem('attendanceID'),
    studentList: state.attendance.studentList,
    loading: state.attendance.loading,
    error: state.attendance.error,
  };
};

const mapDispatchToProps = {
  fetchAttendanceStudentList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceDetails);