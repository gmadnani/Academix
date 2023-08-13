import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Card, Header, Segment, List, Button, Input, Menu, Loader, Label} from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import { fetchCourseDetails, updateCourseDetails } from '../store/actions/course';
import Attendance from "./Attendance";
import ZoomLink from "./Zoom";

import "./css/CourseDetails.css";

const CourseDetails = ({ token, courseID, courseDetails, loading, error, fetchCourseDetails, updateCourseDetails }) => {

  const url = window.location.href;
  const course = url.split("/");
  localStorage.setItem("course", course[5]);

  useEffect(() => {
    fetchCourseDetails(token, courseID);
  }, [fetchCourseDetails, token, courseID]);

  const [editing, setEditing] = useState(false);
  const [editedCourseDescription, setEditedCourseDescription] = useState(courseDetails.courseDescription);
  const [editedSyllabusWeek1, setEditedSyllabusWeek1] = useState(courseDetails.Syllabus_Week1);
  const [editedSyllabusWeek2, setEditedSyllabusWeek2] = useState(courseDetails.Syllabus_Week2);
  const [editedSyllabusWeek3, setEditedSyllabusWeek3] = useState(courseDetails.Syllabus_Week3);
  const [editedSyllabusWeek4, setEditedSyllabusWeek4] = useState(courseDetails.Syllabus_Week4);
  const [editedSyllabusWeek5, setEditedSyllabusWeek5] = useState(courseDetails.Syllabus_Week5);
  const [editedSyllabusWeek6, setEditedSyllabusWeek6] = useState(courseDetails.Syllabus_Week6);
  const [editedSyllabusWeek7, setEditedSyllabusWeek7] = useState(courseDetails.Syllabus_Week7);
  const [editedSyllabusWeek8, setEditedSyllabusWeek8] = useState(courseDetails.Syllabus_Week8);
  const [editedSyllabusWeek9, setEditedSyllabusWeek9] = useState(courseDetails.Syllabus_Week9);
  const [editedSyllabusWeek10, setEditedSyllabusWeek10] = useState(courseDetails.Syllabus_Week10);
  const [editedSyllabusWeek11, setEditedSyllabusWeek11] = useState(courseDetails.Syllabus_Week11);
  const [editedSyllabusWeek12, setEditedSyllabusWeek12] = useState(courseDetails.Syllabus_Week12);

  useEffect(() => {
    setEditedCourseDescription(courseDetails.courseDescription);
    setEditedSyllabusWeek1(courseDetails.Syllabus_Week1);
    setEditedSyllabusWeek2(courseDetails.Syllabus_Week2);
    setEditedSyllabusWeek3(courseDetails.Syllabus_Week3);
    setEditedSyllabusWeek4(courseDetails.Syllabus_Week4);
    setEditedSyllabusWeek5(courseDetails.Syllabus_Week5);
    setEditedSyllabusWeek6(courseDetails.Syllabus_Week6);
    setEditedSyllabusWeek7(courseDetails.Syllabus_Week7);
    setEditedSyllabusWeek8(courseDetails.Syllabus_Week8);
    setEditedSyllabusWeek9(courseDetails.Syllabus_Week9);
    setEditedSyllabusWeek10(courseDetails.Syllabus_Week10);
    setEditedSyllabusWeek11(courseDetails.Syllabus_Week11);
    setEditedSyllabusWeek12(courseDetails.Syllabus_Week12);
  }, [courseDetails]);

  const handleEditToggle = () => {
    if (editing) {
      updateCourseDetails(token, courseID, {
        courseDescription: editedCourseDescription,
        Syllabus_Week1: editedSyllabusWeek1,
        Syllabus_Week2: editedSyllabusWeek2,
        Syllabus_Week3: editedSyllabusWeek3,
        Syllabus_Week4: editedSyllabusWeek4,
        Syllabus_Week5: editedSyllabusWeek5,
        Syllabus_Week6: editedSyllabusWeek6,
        Syllabus_Week7: editedSyllabusWeek7,
        Syllabus_Week8: editedSyllabusWeek8,
        Syllabus_Week9: editedSyllabusWeek9,
        Syllabus_Week10: editedSyllabusWeek10,
        Syllabus_Week11: editedSyllabusWeek11,
        Syllabus_Week12: editedSyllabusWeek12,
      });
    }
    setEditing(!editing);
  };

  if(localStorage.getItem("role") === 'teacher'){
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
      <div>
        <Header as="h3" textAlign="center">
          Course Details
        </Header>
        {loading ? (
          <p>Loading course details...</p>
        ) : error ? (
          <p>Error loading course details: {error.message}</p>
        ) : (
          <Segment>
            <Button onClick={handleEditToggle}>
              {editing ? 'Save' : 'Edit'}
            </Button>
            {editing ? (
              <div>
                Course:
                <Input
                  value={editedCourseDescription}
                  onChange={(e) => setEditedCourseDescription(e.target.value)}
                />
                Syllabus:
                Week1:
                <Input
                  value={editedSyllabusWeek1}
                  onChange={(e) => setEditedSyllabusWeek1(e.target.value)}
                />
                <Input
                  value={editedSyllabusWeek2}
                  onChange={(e) => setEditedSyllabusWeek2(e.target.value)}
                />
                <Input
                  value={editedSyllabusWeek3}
                  onChange={(e) => setEditedSyllabusWeek3(e.target.value)}
                />
                <Input
                  value={editedSyllabusWeek4}
                  onChange={(e) => setEditedSyllabusWeek4(e.target.value)}
                />
                <Input
                  value={editedSyllabusWeek5}
                  onChange={(e) => setEditedSyllabusWeek5(e.target.value)}
                />
                <Input
                  value={editedSyllabusWeek6}
                  onChange={(e) => setEditedSyllabusWeek6(e.target.value)}
                />
                <Input
                  value={editedSyllabusWeek7}
                  onChange={(e) => setEditedSyllabusWeek7(e.target.value)}
                />
                <Input
                  value={editedSyllabusWeek8}
                  onChange={(e) => setEditedSyllabusWeek8(e.target.value)}
                />
                <Input
                  value={editedSyllabusWeek9}
                  onChange={(e) => setEditedSyllabusWeek9(e.target.value)}
                />
                <Input
                  value={editedSyllabusWeek10}
                  onChange={(e) => setEditedSyllabusWeek10(e.target.value)}
                />
                <Input
                  value={editedSyllabusWeek11}
                  onChange={(e) => setEditedSyllabusWeek11(e.target.value)}
                />
                <Input
                  value={editedSyllabusWeek12}
                  onChange={(e) => setEditedSyllabusWeek12(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <p>Course Description: {courseDetails.courseDescription}</p>
                <p>Syllabus:</p>
                <ul>
              <li>Week 1: {courseDetails.Syllabus_Week1}</li>
              <li>Week 2: {courseDetails.Syllabus_Week2}</li>
              <li>Week 3: {courseDetails.Syllabus_Week3}</li>
              <li>Week 4: {courseDetails.Syllabus_Week4}</li>
              <li>Week 5: {courseDetails.Syllabus_Week5}</li>
              <li>Week 6: {courseDetails.Syllabus_Week6}</li>
              <li>Week 7: {courseDetails.Syllabus_Week7}</li>
              <li>Week 8: {courseDetails.Syllabus_Week8}</li>
              <li>Week 9: {courseDetails.Syllabus_Week9}</li>
              <li>Week 10: {courseDetails.Syllabus_Week10}</li>
              <li>Week 11: {courseDetails.Syllabus_Week11}</li>
              <li>Week 12: {courseDetails.Syllabus_Week12}</li>
            </ul>
              </div>
            )}
          </Segment>
        )}
      </div>
    </div>
  );
  }
  else{
    return(
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
      </div>
    );
  }
}
//   return (
//     <div className="ui grid course-details-container">
//       <div className="four wide column left-menu">
//         <Menu fluid vertical tabular color="blue">
//           <Menu.Item
//             as={NavLink}
//             exact
//             to={`/courses/detail/${localStorage.getItem("course")}`}
//             name="Introduction"
//             activeStyle={{ fontWeight: "bold", color: "#2185d0" }}
//           />
//           <Menu.Item
//             as={NavLink}
//             to={`/courses/detail/${localStorage.getItem("course")}/assignments`}
//             name="Assignment"
//             activeStyle={{ fontWeight: "bold", color: "#2185d0" }}
//           />
//           <Menu.Item
//             as={NavLink}
//             to={`/courses/detail/${localStorage.getItem("course")}/grades`}
//             name="Grades"
//             activeStyle={{ fontWeight: "bold", color: "#2185d0" }}
//           />
//           <Menu.Item
//             as={NavLink}
//             to={`/courses/detail/${localStorage.getItem("course")}/attendance`}
//             name="Attendance"
//             activeStyle={{ fontWeight: "bold", color: "#2185d0" }}
//           />
//           <Menu.Item
//             as={NavLink}
//             to={`/courses/detail/${localStorage.getItem("course")}/zoom`}
//             name="Zoom Link"
//             activeStyle={{ fontWeight: "bold", color: "#2185d0" }}
//           />
//         </Menu>
//       </div>

//       <div className="twelve wide stretched column right-content">
//         <Segment basic padded>
//           <Switch>
//             <Route
//               exact
//               path={`/courses/detail/${localStorage.getItem("course")}`}
//             >
//               <Header as="h3" textAlign="center" color="blue">
//                 Course Details
//               </Header>
//               {loading ? (
//                 <Loader
//                   active
//                   inline="centered"
//                   content="Loading course details..."
//                 />
//               ) : error ? (
//                 <Segment color="red">
//                   <p>Error loading course details: {error.message}</p>
//                 </Segment>
//               ) : (
//                 <Segment raised>
//                   <Label as="a" color="blue" ribbon>
//                     Course Description
//                   </Label>
//                   <p>{courseDetails.courseDescription}</p>

//                   <Label as="a" color="teal" ribbon>
//                     Syllabus
//                   </Label>
//                   <List>
//                     {Array.from({ length: 12 }).map((_, index) => (
//                       <List.Item key={index}>
//                         <List.Icon name="right triangle" />
//                         <List.Content>
//                           Week {index + 1}:{" "}
//                           {courseDetails[`Syllabus_Week${index + 1}`]}
//                         </List.Content>
//                       </List.Item>
//                     ))}
//                   </List>
//                 </Segment>
//               )}
//             </Route>
//             <Route
//               path={`/courses/detail/${localStorage.getItem(
//                 "course"
//               )}/assignments`}
//               component={null}
//             />
//             <Route
//               path={`/courses/detail/${localStorage.getItem("course")}/grades`}
//               component={null}
//             />
//             <Route
//               path={`/courses/detail/${localStorage.getItem(
//                 "course"
//               )}/attendance`}
//               component={Attendance}
//             />
//             <Route
//               path={`/courses/detail/${localStorage.getItem("course")}/zoom`}
//               component={ZoomLink}
//             />
//           </Switch>
//         </Segment>
//       </div>
//     </div>
//   );
// };
// //   return(
// //     <div>
// //       <List className='container m-4'>
// //                   <Card className='card'>
// //                       <Link to={`/courses/detail/${localStorage.getItem("course")}`}>Introduction</Link>
// //                       <Link to={`/courses/detail/${localStorage.getItem("course")}/assignments`}>assignments</Link>
// //                       <Link to={`/courses/detail/${localStorage.getItem("course")}/grades`}>grades</Link>
// //                       <Link to={`/courses/detail/${localStorage.getItem("course")}/attendance`}>attendance</Link>
// //                       <Link to={`/courses/detail/${localStorage.getItem("course")}/zoom`}>Zoom Link</Link>
// //                   </Card>
// //       </List>
// //       <div>
// //         <Header as="h3" textAlign="center">
// //           Course Details
// //         </Header>
// //         {loading ? (
// //           <p>Loading course details...</p>
// //         ) : error ? (
// //           <p>Error loading course details: {error.message}</p>
// //         ) : (
// //           <Segment>
// //             {console.log(courseDetails)}
// //             <p>Course Description: {courseDetails.courseDescription}</p>
// //             <p>Syllabus:</p>
// //             <ul>
// //               <li>Week 1: {courseDetails.Syllabus_Week1}</li>
// //               <li>Week 2: {courseDetails.Syllabus_Week2}</li>
// //               <li>Week 3: {courseDetails.Syllabus_Week3}</li>
// //               <li>Week 4: {courseDetails.Syllabus_Week4}</li>
// //               <li>Week 5: {courseDetails.Syllabus_Week5}</li>
// //               <li>Week 6: {courseDetails.Syllabus_Week6}</li>
// //               <li>Week 7: {courseDetails.Syllabus_Week7}</li>
// //               <li>Week 8: {courseDetails.Syllabus_Week8}</li>
// //               <li>Week 9: {courseDetails.Syllabus_Week9}</li>
// //               <li>Week 10: {courseDetails.Syllabus_Week10}</li>
// //               <li>Week 11: {courseDetails.Syllabus_Week11}</li>
// //               <li>Week 12: {courseDetails.Syllabus_Week12}</li>
// //             </ul>
// //           </Segment>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

const mapStateToProps = (state) => ({
  token: state.auth.token,
  courseID: localStorage.getItem("course"),
  loading: state.course.loading,
  error: state.course.error,
  courseDetails: state.course.courseDetails,
});

const mapDispatchToProps = {
  fetchCourseDetails,
  updateCourseDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);
