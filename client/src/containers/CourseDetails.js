import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Card, Header, Segment, List } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { fetchCourseDetails } from '../store/actions/course'

const CourseDetails = ({ token, courseID, courseDetails, loading, error, fetchCourseDetails }) => {
  useEffect(() => {
    fetchCourseDetails(token, courseID);
  }, [fetchCourseDetails, token, courseID]);

  const url = window.location.href;
  const course = url.split("/")
  localStorage.setItem("course", course[5])

  return(
    <div>
      <List className='container m-4'>
                  <Card className='card'>
                      <Link to={`/courses/detail/${localStorage.getItem("course")}`}>Introduction</Link>
                      <Link to={`/courses/detail/${localStorage.getItem("course")}/assignments`}>assignments</Link>
                      <Link to={`/courses/detail/${localStorage.getItem("course")}/grades`}>grades</Link>
                      <Link to={`/courses/detail/${localStorage.getItem("course")}/attendance`}>attendance</Link>
                      <Link to={`/courses/detail/${localStorage.getItem("course")}/zoom`}>Zoom Link</Link>
                  </Card>
      </List>
      <div>
        <Header as="h3" textAlign="center">
          Course Details
        </Header>
        {loading ? (
          <p>Loading course details...</p>
        ) : error ? (
          <p>Error loading course details: {error.message}</p>
        ) : (
          <Segment>
            {console.log(courseDetails)}
            <p>Course Description: {courseDetails.courseDescription}</p>
            <p>Syllabus:</p>
            <ul>
              <li>Week 1: {courseDetails.Syllabus_Week1}</li>
              <li>Week 2: {courseDetails.Syllabus_Week2}</li>
              <li>Week 3: {courseDetails.Syllabus_Week3}</li>
              <li>Week 4: {courseDetails.Syllabus_Week4}</li>
              <li>Week 5: {courseDetails.Syllabus_Week5}</li>
              <li>Week 6: {courseDetails.Syllabus_Week6}</li>
              <li>Week 7: {courseDetails.Syllabus_Week7}</li>
              <li>Week 8: {courseDetails.Syllabus_Week8}</li>
              <li>Week 9: {courseDetails.Syllabus_Week9}</li>
              <li>Week 10: {courseDetails.Syllabus_Week10}</li>
              <li>Week 11: {courseDetails.Syllabus_Week11}</li>
              <li>Week 12: {courseDetails.Syllabus_Week12}</li>
            </ul>
          </Segment>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  token: state.auth.token,
  courseID: localStorage.getItem("course"),
  courseDetails: state.course.courseDetails,
  loading: state.course.loading,
  error: state.course.error
});

const mapDispatchToProps = {
  fetchCourseDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetails);
