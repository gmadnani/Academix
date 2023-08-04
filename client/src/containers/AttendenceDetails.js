import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Segment, Header, Loader, Dimmer } from 'semantic-ui-react';
import { fetchAttendanceDetail } from '../store/actions/attendance';

const AttendanceDetail = ({ token, attendanceID, attendanceDetail, loadingDetail, errorDetail, fetchAttendanceDetail }) => {
  useEffect(() => {
    fetchAttendanceDetail(token, attendanceID);
  }, [fetchAttendanceDetail, token, attendanceID]);

  if (loadingDetail) {
    return (
      <Segment>
        <Dimmer active>
          <Loader>Loading attendance detail...</Loader>
        </Dimmer>
      </Segment>
    );
  }

  if (errorDetail) {
    return (
      <Segment>
        <p>Error loading attendance detail: {errorDetail.message}</p>
      </Segment>
    );
  }

  if (!attendanceDetail) {
    return null;
  }

  return (
    <div>
      <Header as="h3" textAlign="center">
        Attendance Detail
      </Header>
      <Segment>
        {/* Display the attendance detail information here */}
        <p>Title: {attendanceDetail.title}</p>
        <p>Created Date: {attendanceDetail.created_date}</p>
        <p>Valid Time (in minutes): {attendanceDetail.valid_time}</p>
        {/* ... other details */}
      </Segment>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    attendanceID: localStorage.getItem('selectedAttendanceID'), // Retrieve attendanceID from local storage
    attendanceDetail: state.attendance.attendanceDetail,
    loadingDetail: state.attendance.loadingDetail,
    errorDetail: state.attendance.errorDetail,
  };
};

const mapDispatchToProps = {
  fetchAttendanceDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceDetail);