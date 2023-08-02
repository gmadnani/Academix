import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import StudentHome from "./containers/StudentHome";
import TeacherHome from "./containers/TeacherHome";
import CourseDetails from "./containers/CourseDetails";
import AdminCourseRegisteration from "./containers/AdminCourseRegisteration";

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/student" component={StudentHome}/>
    <Route path="/teacher" component={TeacherHome}/>
    <Route exact path="/" component={HomepageLayout} />
    <Route path={`/courses/detail/:slug`} component={CourseDetails}/>
    <Route path="/courseRegisteration" component={AdminCourseRegisteration}/>
  </Hoc>
);
console.log(localStorage.getItem("course"))

export default BaseRouter;
