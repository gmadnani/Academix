import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCourses } from "../store/actions/course";
import { Card, CardContent, List } from "semantic-ui-react";
import { Link } from 'react-router-dom';

class StudentHome extends Component {
  componentDidMount() {
    this.props.onFetchCourses(this.props.token);
  }

  render() {
    const { courses } = this.props;
    return (
      <div style={{padding: '20px'}}>
        <h2>Spring - 2024</h2>
        <List>
          {courses.map(course => (
            <List.Item key={course.courseID}>
              <Card fluid={true}>
                <CardContent>
                  <Card.Header>
                    <Link to={`/courses/detail/${course.courseID}`}>
                      {course.courseName}
                    </Link>
                  </Card.Header>
                  <Card.Meta>
                    <strong>
                      {course.owner}
                    </strong>
                  </Card.Meta>
                  <Card.Description>
                    {course.courseDescription}
                  </Card.Description>
                </CardContent>
              </Card>
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  courses: state.course.courses,
  loading: state.course.loading,
  error: state.course.error
});

const mapDispatchToProps = dispatch => ({
  onFetchCourses: (token) => dispatch(fetchCourses(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentHome);
