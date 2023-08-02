// import React, {useEffect} from "react";
// import { connect } from "react-redux";
// import { Grid, Segment, List , Header, Button,  } from 'semantic-ui-react';
// import 'swiper/css';
// import { fetchUsers } from '../store/actions/user';

// const AdminCourseRegisteration = ({
//   role,
//   courses,
//   users,
//   loadingCourses,
//   loadingUsers,
//   errorCourses,
//   errorUsers,
//   // fetchCourses,
//   fetchUsers,
//   token,
// }) => {
//   useEffect(() => {
//     if (role === 'student') {
//       // fetchCourses(token);
//       fetchUsers(token);
//     }
//   }, [role, fetchUsers, token]);
//   return(
//     // <div>
//     // <div>
//     //     <Header as="h3" textAlign="center">
//     //       List of Courses
//     //     </Header>
//     //     <Segment>
//     //       <List>
//     //         {loadingCourses ? (
//     //           <p>Loading courses...</p>
//     //         ) : errorCourses ? (
//     //           <p>Error loading courses: {errorCourses.message}</p>
//     //         ) : (
//     //           courses.map((course) => (
//     //             <List.Item key={course.id}>
//     //               <p>{course.title}</p>
//     //             </List.Item>
//     //           ))
//     //         )}
//     //       </List>
//     //     </Segment>
//     //   </div>
      
//       <div>
//         <Header as="h3" textAlign="center">
//           List of Users
//         </Header>
//         <Segment>
//           <List>
//             {loadingUsers ? (
//               <p>Loading users...</p>
//             ) : errorUsers ? (
//               <p>Error loading users: {errorUsers.message}</p>
//             ) : (
//               users.map((user) => (
//                 <List.Item key={user.id}>
//                   <p>{user.owner}</p>
//                   <p>{user.email}</p>
//                 </List.Item>
//               ))
//             )}
//             console.log(users);
//           </List>
//         </Segment>
//       </div>  
//   );
// }


// const mapStateToProps = state => {
//   return {
//     loadingUsers: state.user.loading,
//     errorUsers: state.user.error,
//     users: state.user.users,
//     token: state.auth.token,
//     role: state.auth.role
//   };
// };

// const mapDispatchToProps = {
//   fetchUsers,
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AdminCourseRegisteration);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Segment, List, Header, Button, Dropdown, Form } from 'semantic-ui-react';
import 'swiper/css';
import { fetchUsers } from '../store/actions/user';
import { registerStudentInCourse } from '../store/actions/course';

const AdminCourseRegisteration = ({
  role,
  courses,
  users,
  loadingCourses,
  loadingUsers,
  errorCourses,
  errorUsers,
  fetchUsers,
  registerStudentInCourse,
  token,
}) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    if (role !== 'student') {
      fetchUsers(token);
    }
  }, [role, fetchUsers, token]);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleStudentChange = (event, data) => {
    setSelectedStudent(data.value);
  };

  const handleRegister = () => {
    if (selectedCourse && selectedStudent) {
      // Assuming selectedStudent contains the email of the selected student
      registerStudentInCourse(token, selectedStudent, selectedCourse);
    }
  };

  return (
    <div>
      <Header as="h3" textAlign="center">
        Admin Course Registration
      </Header>
      <Segment>
        <Form>
          <Form.Field>
            <label>Course ID</label>
            <input
              type="text"
              placeholder="Enter Course ID"
              value={selectedCourse}
              onChange={handleCourseChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Select Student</label>
            <Dropdown
              placeholder="Select Student"
              fluid
              search
              selection
              options={users.map((user) => ({
                key: user.id,
                value: user.email, // Assuming user.email contains the email of the student
                text: user.owner,
              }))}
              value={selectedStudent}
              onChange={handleStudentChange}
            />
          </Form.Field>
          <Button onClick={handleRegister} primary>
            Register Student
          </Button>
        </Form>
      </Segment>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loadingUsers: state.user.loading,
    errorUsers: state.user.error,
    users: state.user.users,
    token: state.auth.token,
    role: state.auth.role
  };
};

const mapDispatchToProps = {
  fetchUsers,
  registerStudentInCourse,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCourseRegisteration);
