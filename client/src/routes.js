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
import Attendance from "./containers/Attendance";
import Zoom from "./containers/Zoom";
import AttendenceDetails from "./containers/AttendenceDetails";

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/student" component={StudentHome}/>
    <Route path="/teacher" component={TeacherHome}/>
    <Route exact path="/" component={HomepageLayout} />
    <Route path={`/courses/detail/:slug`} component={CourseDetails}/>
    <Route path={`/courses/detail/:slug/attendance`} component={Attendance}/>
    <Route path={`/courses/detail/:slug/zoom`} component={Zoom}/>
    <Route path="/courseRegisteration" component={AdminCourseRegisteration}/>
    <Route path={`/courses/detail/:slug/attendance/detail/:slug`} component={AttendenceDetails}/>
  </Hoc>
);
console.log(localStorage.getItem("course"))

export default BaseRouter;
