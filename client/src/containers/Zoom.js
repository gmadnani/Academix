import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Header, Segment, Button, Input } from "semantic-ui-react";
import { fetchCourseDetails, updateCourseDetails } from '../store/actions/course';

const Zoom = ({ token, courseID, courseDetails, loading, error, fetchCourseDetails, updateCourseDetails }) => {
  useEffect(() => {
    fetchCourseDetails(token, courseID);
  }, [fetchCourseDetails, token, courseID]);

  const [editing, setEditing] = useState(false);
  const [editedCourseZoomlink, setEditedCourseZoomlink] = useState(courseDetails.courseZoomlink);

  useEffect(() => {
    setEditedCourseZoomlink(courseDetails.courseZoomlink);
  }, [courseDetails]);

  const handleEditToggle = () => {
    if (editing) {
      updateCourseDetails(token, courseID, {
        courseZoomlink: editedCourseZoomlink,
      }).then(() => {
        fetchCourseDetails(token, courseID);
      });
    }
    setEditing(!editing);
  }
  
  if(localStorage.getItem("role") === 'teacher'){
  return(
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
            <Button onClick={handleEditToggle}>
              {editing ? 'Save' : 'Edit'}
            </Button>
            {editing ? (
              <div>
                Zoom Link: 
                <Input
                value={editedCourseZoomlink}
                onChange={(e) => setEditedCourseZoomlink(e.target.value)}
                />
                </div>
            ):(

              <p>Zoom Link: {courseDetails.courseZoomlink}</p>
            )}
          </Segment>
        )}
      </div>
    </div>
  );
  }
  else{
    return(
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
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  courseID: localStorage.getItem("course"),
  courseDetails: state.course.courseDetails,
  loading: state.course.loading,
  error: state.course.error,
});

const mapDispatchToProps = {
  fetchCourseDetails,
  updateCourseDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(Zoom);
