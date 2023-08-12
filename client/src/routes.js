import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import CourseList from "./containers/CourseList";
import CourseDetails from "./containers/CourseDetails";
import AdminCourseRegisteration from "./containers/AdminCourseRegisteration";
//import Attendance from "./containers/Attendance";
//import Zoom from "./containers/Zoom";
import AttendenceDetails from "./containers/AttendenceDetails";
import CreateCourse from "./containers/CreateCourse";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <PrivateRoute path="/courseList" component={CourseList} />
    <PrivateRoute path="/home" component={HomepageLayout} />
    <PrivateRoute path="/courses/detail/:courseID" component={CourseDetails} />
    <PrivateRoute path="/createCourse" component={CreateCourse} />
    {/* <PrivateRoute path="/courses/detail/:courseID/attendance" component={Attendance} />
    <PrivateRoute path="/courses/detail/:courseID/zoom" component={Zoom} /> */}
    <PrivateRoute
      path="/courses/detail/:courseID/attendance/detail/:attendanceID"
      component={AttendenceDetails}
    />
    <PrivateRoute
      path="/courseRegisteration"
      component={AdminCourseRegisteration}
    />
  </Hoc>
);

export default BaseRouter;
