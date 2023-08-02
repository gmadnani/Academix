import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCourses } from "../store/actions/course";
import { Card, CardContent, List } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

class CourseDetails extends Component {
  componentDidMount() {
    this.props.onFetchCourses(this.props.token);
  }

  render() {
    const url = window.location.href;
    const courseID = url.split("/")
    localStorage.setItem("course", courseID[5])
    return(
      <Grid>
        <List className='container m-4'>
                    <Card className='card'>
                        <Link to={`/courses/detail/${localStorage.getItem("course")}`}>Introduction</Link>
                        <Link to={`/courses/detail/${localStorage.getItem("course")}/assignments`}>assignments</Link>
                        <Link to={`/courses/detail/${localStorage.getItem("course")}/grades`}>grades</Link>
                        <Link to={`/courses/detail/${localStorage.getItem("course")}/attendance`}>attendance</Link>
                        <Link to={`/courses/detail/${localStorage.getItem("course")}/zoom`}>Zoom Link</Link>
                    </Card>
        </List>
        <h1> Introduction </h1>
      </Grid>
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
)(CourseDetails);
