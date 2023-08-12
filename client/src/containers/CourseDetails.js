import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Menu, Header, Segment, Loader, Label, List } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { fetchCourseDetails } from "../store/actions/course";
import Attendance from "./Attendance";
import ZoomLink from "./Zoom";

import "./css/CourseDetails.css";

const CourseDetails = ({
  token,
  courseID,
  courseDetails,
  loading,
  error,
  fetchCourseDetails,
}) => {
  useEffect(() => {
    fetchCourseDetails(token, courseID);
  }, [fetchCourseDetails, token, courseID]);

  const url = window.location.href;
  const course = url.split("/");
  localStorage.setItem("course", course[5]);

  return (
    <div className="ui grid course-details-container">
      <div className="four wide column left-menu">
        <Menu fluid vertical tabular color="blue">
          <Menu.Item
            as={NavLink}
            exact
            to={`/courses/detail/${localStorage.getItem("course")}`}
            name="Introduction"
            activeStyle={{ fontWeight: "bold", color: "#2185d0" }}
          />
          <Menu.Item
            as={NavLink}
            to={`/courses/detail/${localStorage.getItem("course")}/assignments`}
            name="Assignment"
            activeStyle={{ fontWeight: "bold", color: "#2185d0" }}
          />
          <Menu.Item
            as={NavLink}
            to={`/courses/detail/${localStorage.getItem("course")}/grades`}
            name="Grades"
            activeStyle={{ fontWeight: "bold", color: "#2185d0" }}
          />
          <Menu.Item
            as={NavLink}
            to={`/courses/detail/${localStorage.getItem("course")}/attendance`}
            name="Attendance"
            activeStyle={{ fontWeight: "bold", color: "#2185d0" }}
          />
          <Menu.Item
            as={NavLink}
            to={`/courses/detail/${localStorage.getItem("course")}/zoom`}
            name="Zoom Link"
            activeStyle={{ fontWeight: "bold", color: "#2185d0" }}
          />
        </Menu>
      </div>

      <div className="twelve wide stretched column right-content">
        <Segment basic padded>
          <Switch>
            <Route
              exact
              path={`/courses/detail/${localStorage.getItem("course")}`}
            >
              <Header as="h3" textAlign="center" color="blue">
                Course Details
              </Header>
              {loading ? (
                <Loader
                  active
                  inline="centered"
                  content="Loading course details..."
                />
              ) : error ? (
                <Segment color="red">
                  <p>Error loading course details: {error.message}</p>
                </Segment>
              ) : (
                <Segment raised>
                  <Label as="a" color="blue" ribbon>
                    Course Description
                  </Label>
                  <p>{courseDetails.courseDescription}</p>

                  <Label as="a" color="teal" ribbon>
                    Syllabus
                  </Label>
                  <List>
                    {Array.from({ length: 12 }).map((_, index) => (
                      <List.Item key={index}>
                        <List.Icon name="right triangle" />
                        <List.Content>
                          Week {index + 1}:{" "}
                          {courseDetails[`Syllabus_Week${index + 1}`]}
                        </List.Content>
                      </List.Item>
                    ))}
                  </List>
                </Segment>
              )}
            </Route>
            <Route
              path={`/courses/detail/${localStorage.getItem(
                "course"
              )}/assignments`}
              component={null}
            />
            <Route
              path={`/courses/detail/${localStorage.getItem("course")}/grades`}
              component={null}
            />
            <Route
              path={`/courses/detail/${localStorage.getItem(
                "course"
              )}/attendance`}
              component={Attendance}
            />
            <Route
              path={`/courses/detail/${localStorage.getItem("course")}/zoom`}
              component={ZoomLink}
            />
          </Switch>
        </Segment>
      </div>
    </div>
  );
};
//   return(
//     <div>
//       <List className='container m-4'>
//                   <Card className='card'>
//                       <Link to={`/courses/detail/${localStorage.getItem("course")}`}>Introduction</Link>
//                       <Link to={`/courses/detail/${localStorage.getItem("course")}/assignments`}>assignments</Link>
//                       <Link to={`/courses/detail/${localStorage.getItem("course")}/grades`}>grades</Link>
//                       <Link to={`/courses/detail/${localStorage.getItem("course")}/attendance`}>attendance</Link>
//                       <Link to={`/courses/detail/${localStorage.getItem("course")}/zoom`}>Zoom Link</Link>
//                   </Card>
//       </List>
//       <div>
//         <Header as="h3" textAlign="center">
//           Course Details
//         </Header>
//         {loading ? (
//           <p>Loading course details...</p>
//         ) : error ? (
//           <p>Error loading course details: {error.message}</p>
//         ) : (
//           <Segment>
//             {console.log(courseDetails)}
//             <p>Course Description: {courseDetails.courseDescription}</p>
//             <p>Syllabus:</p>
//             <ul>
//               <li>Week 1: {courseDetails.Syllabus_Week1}</li>
//               <li>Week 2: {courseDetails.Syllabus_Week2}</li>
//               <li>Week 3: {courseDetails.Syllabus_Week3}</li>
//               <li>Week 4: {courseDetails.Syllabus_Week4}</li>
//               <li>Week 5: {courseDetails.Syllabus_Week5}</li>
//               <li>Week 6: {courseDetails.Syllabus_Week6}</li>
//               <li>Week 7: {courseDetails.Syllabus_Week7}</li>
//               <li>Week 8: {courseDetails.Syllabus_Week8}</li>
//               <li>Week 9: {courseDetails.Syllabus_Week9}</li>
//               <li>Week 10: {courseDetails.Syllabus_Week10}</li>
//               <li>Week 11: {courseDetails.Syllabus_Week11}</li>
//               <li>Week 12: {courseDetails.Syllabus_Week12}</li>
//             </ul>
//           </Segment>
//         )}
//       </div>
//     </div>
//   );
// }

const mapStateToProps = (state) => ({
  token: state.auth.token,
  courseID: localStorage.getItem("course"),
  loading: state.course.loading,
  error: state.course.error,
  courseDetails: state.course.courseDetails,
});

const mapDispatchToProps = {
  fetchCourseDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);
