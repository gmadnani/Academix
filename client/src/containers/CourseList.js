import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../store/actions/course";
import { Card, CardContent, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./css/CourseList.css";

class CourseList extends Component {
  componentDidMount() {
    this.props.onFetchCourses(this.props.token);
  }

  processCourses(courses) {
    const sortedCourses = {};
    courses.forEach((course) => {
      const key = `${course.courseSemester}-${course.courseYear}`;
      if (!sortedCourses[key]) {
        sortedCourses[key] = [];
      }
      sortedCourses[key].push(course);
    });

    const sortedKeys = Object.keys(sortedCourses).sort((a, b) => {
      const [semA, yearA] = a.split("-");
      const [, yearB] = b.split("-");
      if (yearA !== yearB) {
        return parseInt(yearA) - parseInt(yearB);
      }
      return semA === "Spring" ? -1 : 1;
    });

    return sortedKeys.map((key) => ({
      semester: key.split("-")[0],
      year: key.split("-")[1],
      courses: sortedCourses[key],
    }));
  }
  render() {
    const processedCourses = this.processCourses(this.props.courses);

    return (
      <div className="course-list-container">
        {processedCourses.map((semesterGroup, index) => (
          <div
            className="semester-group"
            key={`${semesterGroup.semester}-${semesterGroup.year}`}
          >
            <h2 className="semester-header">{`${semesterGroup.semester} - ${semesterGroup.year}`}</h2>
            <List>
              {semesterGroup.courses.map((course) => (
                <List.Item key={course.courseID} className="course-item">
                  <Card fluid={true} className="course-card">
                    <CardContent className="course-card-content">
                      <Card.Header className="course-card-header">
                        <Link to={`/courses/detail/${course.courseID}`}>
                          {course.courseID}- {course.courseName}
                        </Link>
                      </Card.Header>
                      {localStorage.getItem("role") === "student" && (
                        <Card.Meta className="course-card-meta">
                          <strong>teacher- {course.owner}</strong>
                        </Card.Meta>
                      )}
                    </CardContent>
                  </Card>
                </List.Item>
              ))}
            </List>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  courses: state.course.courses,
  loading: state.course.loading,
  error: state.course.error,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchCourses: (token) => dispatch(fetchCourses(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
