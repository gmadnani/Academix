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

const BaseRouter = () => (
  <Hoc>
    <Route path="/" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/courseList" component={CourseList}/>
    <Route exact path="/home" component={HomepageLayout} />
    <Route path={`/courses/detail/:slug`} component={CourseDetails}/>
    <Route path={`/createCourse`} component={CreateCourse}/>
    <Route exact path={`/courses/detail/:slug/attendance`} component={Attendance}/>
    <Route path={`/courses/detail/:slug/zoom`} component={Zoom}/>
    <Route path="/courseRegisteration" component={AdminCourseRegisteration}/>
    <Route path={`/courses/detail/:slug/attendance/detail/:slug`} component={AttendenceDetails}/>
  </Hoc>
);

export default BaseRouter;
