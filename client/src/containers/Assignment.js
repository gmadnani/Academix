import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Segment, Header, Button, Form, Modal, Input, TextArea } from 'semantic-ui-react';
import { fetchAssignments, createAssignment } from '../store/actions/assignment';

const Assignment = ({
  token,
  courseID,
  assignments,
  loading,
  error,
  fetchAssignments,
  createAssignment,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [fullGrade, setFullGrade] = useState('');
  const [assignmentFiles, setAssignmentFiles] = useState(null);

  useEffect(() => {
    fetchAssignments(token, courseID);
  }, [fetchAssignments, token, courseID]);

  const handleCreateAssignment = () => {
    const formattedDueDate = new Date(dueDate).toISOString();
    createAssignment(token, courseID, title, formattedDueDate, fullGrade, assignmentFiles);
    setTitle('');
    setDueDate('');
    setFullGrade('');
    setAssignmentFiles(null);
    setShowForm(false);
  };
  
  const handleFileChange = (e) => {
    setAssignmentFiles(e.target.files[0]);
  };

  return (
    <div>
      <Header as="h3" textAlign="center">
        Assignments
      </Header>
      <Button onClick={() => setShowForm(true)}>Create Assignment</Button>
      <Segment>
        {assignments.map((assignment) => (
          <div key={assignment.id}>
            <h4>{assignment.title}</h4>
            {/* Display other assignment details */}
          </div>
        ))}
      </Segment>
      <Modal open={showForm}>
        <Modal.Header>Create Assignment</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Title</label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Due Date</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Full Grade</label>
              <Input
                type="text"
                value={fullGrade}
                onChange={(e) => setFullGrade(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
            <label>Assignment Files</label>
            <Input
              type="file"
              onChange={handleFileChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setShowForm(false)}>Cancel</Button>
        <Button onClick={handleCreateAssignment} primary>
          Create
        </Button>
      </Modal.Actions>
    </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    courseID: localStorage.getItem('course'), // Modify this to get courseID from your state
    assignments: state.assignment.assignments,
    loading: state.assignment.loading,
    error: state.assignment.error,
  };
};

const mapDispatchToProps = {
  fetchAssignments,
  createAssignment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Assignment);
