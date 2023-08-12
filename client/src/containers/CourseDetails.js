import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Header, Segment, List, Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchCourseDetails, updateCourseDescription } from '../store/actions/course';

const CourseDetails = ({
  token,
  courseID,
  courseDetails,
  loading,
  error,
  fetchCourseDetails,
  updateCourseDescription,
}) => {
  useEffect(() => {
    fetchCourseDetails(token, courseID);
  }, [fetchCourseDetails, token, courseID]);

  const [editing, setEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(courseDetails.courseDescription);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditedDescription(courseDetails.courseDescription);
  };

  const handleSaveClick = () => {
    updateCourseDescription(token, courseID, editedDescription)
      .then(() => {
        fetchCourseDetails(token, courseID);
        setEditing(false);
      })
      .catch(error => {
        console.error('Error updating course description:', error);
      });
  };

  return (
    <div>
      <List className="container m-4">
        <Card className="card">
          <Link to={`/courses/detail/${courseID}`}>Introduction</Link>
          <Link to={`/courses/detail/${courseID}/assignments`}>assignments</Link>
          <Link to={`/courses/detail/${courseID}/grades`}>grades</Link>
          <Link to={`/courses/detail/${courseID}/attendance`}>attendance</Link>
          <Link to={`/courses/detail/${courseID}/zoom`}>Zoom Link</Link>
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
            <div>
              <Button
                primary
                floated="right"
                onClick={handleEditClick}
                disabled={editing}
              >
                Edit
              </Button>
            </div>
            {editing ? (
              <Form>
                <Form.TextArea
                  label="Course Description"
                  value={editedDescription}
                  onChange={(event) => setEditedDescription(event.target.value)}
                />
                <Button.Group>
                  <Button
                    positive
                    onClick={handleSaveClick}
                  >
                    Save
                  </Button>
                  <Button.Or />
                  <Button
                    negative
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                </Button.Group>
              </Form>
            ) : (
              <div>
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
              </div>
            )}
          </Segment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
  courseID: localStorage.getItem('course'),
  loading: state.course.loading,
  error: state.course.error,
  courseDetails: state.course.courseDetails,
});

const mapDispatchToProps = {
  fetchCourseDetails,
  updateCourseDescription,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);