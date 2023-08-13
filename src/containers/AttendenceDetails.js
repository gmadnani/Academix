import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Segment, List, Header, Message } from "semantic-ui-react";
import { fetchAttendanceStudentList } from "../store/actions/attendance";
import axios from "axios";

import "./css/CourseDetails.css";

const AttendanceDetails = ({
  token,
  attendanceID,
  studentList,
  loadingStudentList,
  errorStudentList,
  fetchAttendanceStudentList,
}) => {
  const [updatedAttendance, setUpdatedAttendance] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchAttendanceStudentList(token, attendanceID);
  }, [fetchAttendanceStudentList, token, attendanceID]);

  const handleUpdateAttendance = (studentID, newAttendanceStatus) => {
    setUpdatedAttendance({
      ...updatedAttendance,
      [studentID]: newAttendanceStatus,
    });
  };

  const handleSubmitAttendance = async () => {
    const updatedStudentIDs = Object.keys(updatedAttendance);

    if (updatedStudentIDs.length > 0) {
      const updatePromises = updatedStudentIDs.map(async (studentID) => {
        const newAttendanceStatus = updatedAttendance[studentID];
        try {
          await axios.put(
            `https://academix-back-f296f40df966.herokuapp.com/attendance/detail/${attendanceID}/`,
            {
              studentID: studentID,
              if_attended: newAttendanceStatus,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setShowSuccessMessage(true);
          return true;
        } catch (error) {
          console.error(`Error updating attendance for ${studentID}:`, error);
          return false;
        }
      });

      Promise.all(updatePromises).then(() => {
        fetchAttendanceStudentList(token, attendanceID);
      });
    }
  };

  return (
    <div>
      <Header as="h3" textAlign="center">
        Student List for Attendance
      </Header>
      {showSuccessMessage && (
        <Message
          success
          header="Attendance Updated"
          content="Attendance has been updated successfully!"
        />
      )}
      {loadingStudentList ? (
        <p>Loading student list...</p>
      ) : errorStudentList ? (
        <p>Error loading student list: {errorStudentList.message}</p>
      ) : // Add an extra check for studentList before using map
      studentList && studentList.length > 0 ? (
        <Segment basic>
          <List divided relaxed>
            {studentList.map((student) => (
              <List.Item
                key={student.student_email}
                className="student-list-item"
              >
                <List.Content>
                  <List.Header>{student.student_username}</List.Header>
                  <List.Description>
                    {student.student_email} -{" "}
                    {student.if_attended ? "Attended" : "Absent"}
                  </List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      ) : (
        studentList && studentList.length > 0 ? (
          <Segment>
            <List divided relaxed>
              {studentList.map((student) => (
                <List.Item key={student.student_username}>
                  <List.Content>
                    <List.Header>{student.student_username}</List.Header>
                    <List.Description>
                      {student.if_attended ? "Attended" : "Absent"}
                      <input
                        type="checkbox"
                        checked={updatedAttendance[student.student_username] || student.if_attended}
                        onChange={() =>
                          handleUpdateAttendance(
                            student.student_username,
                            !updatedAttendance[student.student_username]
                          )
                        }
                      />
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
            <button onClick={handleSubmitAttendance}>Update Attendance</button>
          </Segment>
        ) : (
          <p>No students found for this attendance.</p>
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  attendanceID: localStorage.getItem("attendanceID"),
  studentList: state.attendance.studentList,
  loading: state.attendance.loading,
  error: state.attendance.error,
});

const mapDispatchToProps = {
  fetchAttendanceStudentList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceDetails);
