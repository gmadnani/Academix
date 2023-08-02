import React, {useEffect} from "react";
import { connect } from "react-redux";
import { Grid, Segment, List , Header, Button,  } from 'semantic-ui-react';
import 'swiper/css';
import { fetchUsers } from '../store/actions/user';

const AdminCourseRegisteration = ({
  role,
  courses,
  users,
  loadingCourses,
  loadingUsers,
  errorCourses,
  errorUsers,
  // fetchCourses,
  fetchUsers,
  token,
}) => {
  useEffect(() => {
    if (role === 'student') {
      // fetchCourses(token);
      fetchUsers(token);
    }
  }, [role, fetchUsers, token]);
  return(
    // <div>
    // <div>
    //     <Header as="h3" textAlign="center">
    //       List of Courses
    //     </Header>
    //     <Segment>
    //       <List>
    //         {loadingCourses ? (
    //           <p>Loading courses...</p>
    //         ) : errorCourses ? (
    //           <p>Error loading courses: {errorCourses.message}</p>
    //         ) : (
    //           courses.map((course) => (
    //             <List.Item key={course.id}>
    //               <p>{course.title}</p>
    //             </List.Item>
    //           ))
    //         )}
    //       </List>
    //     </Segment>
    //   </div>
      
      <div>
        <Header as="h3" textAlign="center">
          List of Users
        </Header>
        <Segment>
          <List>
            {loadingUsers ? (
              <p>Loading users...</p>
            ) : errorUsers ? (
              <p>Error loading users: {errorUsers.message}</p>
            ) : (
              users.map((user) => (
                <List.Item key={user.id}>
                  <p>{user.owner}</p>
                  <p>{user.email}</p>
                </List.Item>
              ))
            )}
            console.log(users);
          </List>
        </Segment>
      </div>  
  );
}


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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCourseRegisteration);
