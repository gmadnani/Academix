import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCourses } from "../store/actions/course";
import { Card, CardContent, List } from "semantic-ui-react";
import { Link } from 'react-router-dom';

class Zoom extends Component {
  componentDidMount() {
    this.props.onFetchCourses(this.props.token);
  }

  render() {
    const url = window.location.href;
    const courseID = url.split("/")
    localStorage.setItem("course", courseID[5])
    return( <h1> Zoom</h1> );
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
)(Zoom);
