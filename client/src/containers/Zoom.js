import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Header, Segment } from "semantic-ui-react";
//import { Link } from "react-router-dom";
import { fetchCourseDetails } from "../store/actions/course";

const Zoom = ({
  token,
  courseID,
  courseDetails,
  loading,
  error,
  fetchCourseDetails,
}) => {
  useEffect(() => {
    fetchCourseDetails(token, courseID);
  }, [fetchCourseDetails, token, courseID]);

  const url = window.location.href;
  const course = url.split("/");
  localStorage.setItem("course", course[5]);

  return (
    <div>
      <div>
        <Header as="h3" textAlign="center">
          Zoom Link
        </Header>
        {loading ? (
          <p>Loading course details...</p>
        ) : error ? (
          <p>Error loading course details: {error.message}</p>
        ) : (
          <Segment>
            {console.log(courseDetails)}
            <p>Zoom Link: {courseDetails.courseZoomlink}</p>
          </Segment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  courseID: localStorage.getItem("course"),
  courseDetails: state.course.courseDetails,
  loading: state.course.loading,
  error: state.course.error,
});

const mapDispatchToProps = {
  fetchCourseDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(Zoom);
