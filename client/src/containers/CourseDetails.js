import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Header, Segment, List, Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchCourseDetails, updateCourseDescription, updateSyllabusEntry } from '../store/actions/course';

const CourseDetails = ({
  token,
  courseID,
  courseDetails,
  loading,
  error,
  fetchCourseDetails,
  updateCourseDescription,
  updateSyllabusEntry,
}) => {
  useEffect(() => {
    fetchCourseDetails(token, courseID);
  }, [fetchCourseDetails, token, courseID]);

  const [editing, setEditing] = useState(false);
  const [editingSyllabus, setEditingSyllabus] = useState(false);
  const [editedDescription, setEditedDescription] = useState(courseDetails.courseDescription);
  const [editedSyllabus, setEditedSyllabus] = useState({ ...courseDetails.syllabus });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditedDescription(courseDetails.courseDescription);
    setEditedSyllabus({ ...courseDetails.syllabus });
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

  const handleSyllabusChange = (week, newValue) => {
    setEditedSyllabus(prevSyllabus => ({
      ...prevSyllabus,
      [week]: newValue,
    }));
  };

  const handleSaveSyllabusClick = () => {
    Object.keys(editedSyllabus).forEach(week => {
      updateSyllabusEntry(token, courseID, week, editedSyllabus[week])
        .then(() => {
          fetchCourseDetails(token, courseID);
        })
        .catch(error => {
          console.error(`Error updating syllabus for week ${week}:`, error);
        });
    });
  };

  const handleEditSyllabusClick = () => {
    setEditingSyllabus(true);
  };

  return (
    <div>
      <List className="container m-4">
        <Card className="card">
          <Link to={`/courses/detail/${courseID}`}>Introduction</Link>
          <Link to={`/courses/detail/${courseID}/assignments`}>Assignments</Link>
          <Link to={`/courses/detail/${courseID}/grades`}>Grades</Link>
          <Link to={`/courses/detail/${courseID}/attendance`}>Attendance</Link>
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
              <Button
                primary
                floated="right"
                onClick={handleEditSyllabusClick}
                disabled={editingSyllabus}
              >
                Edit Syllabus
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
                  {Object.keys(courseDetails).map(key => {
                    if (key.startsWith('Syllabus_Week')) {
                      const weekNumber = key.split('Syllabus_Week')[1];
                      return (
                        <li key={key}>
                          <strong>Week {weekNumber}: </strong>
                          {editing ? (
                            <Form.Input
                              value={editedSyllabus[key]}
                              onChange={event => handleSyllabusChange(key, event.target.value)}
                            />
                          ) : (
                            courseDetails[key]
                          )}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
                {editing && (
                  <Button onClick={handleSaveSyllabusClick} primary>
                    Save Syllabus
                  </Button>
                )}
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
  updateSyllabusEntry,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);
