import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import CourseList from "./containers/CourseList";
import CourseDetails from "./containers/CourseDetails";
import AdminCourseRegisteration from "./containers/AdminCourseRegisteration";
import Attendance from "./containers/Attendance";
import Zoom from "./containers/Zoom";
import AttendenceDetails from "./containers/AttendenceDetails";
import CreateCourse from "./containers/CreateCourse";
import Assignment from "./containers/Assignment";
import AdminCourseRemove from "./containers/AdminCourseRemove";
import AdminUserChange from "./containers/AdminUserChange";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/courseList" component={CourseList}/>
    <Route path="/home" component={HomepageLayout} />
    <Route path="/courses/detail/:courseID" component={CourseDetails} />
    <Route path="/createCourse" component={CreateCourse}/>
    <Route path="/courses/detail/:courseID/attendance" component={Attendance} />
    <Route path="/courses/detail/:courseID/assignments" component={Assignment} />
    <Route path="/courses/detail/:courseID/zoom" component={Zoom} />
    <Route path="/courses/detail/:courseID/attendance/detail/:attendanceID" component={AttendenceDetails} />
    <Route path="/courseRegisteration" component={AdminCourseRegisteration}/>
    <Route path="/courseRemove" component={AdminCourseRemove}/>
    <Route path="/changeUser" component={AdminUserChange}/>
  </Hoc>
);

export default BaseRouter;
