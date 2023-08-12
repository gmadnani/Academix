import React, { useEffect } from "react";
import { connect } from "react-redux";
import { List, Header, Button } from "semantic-ui-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useHistory, Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { fetchUsers } from "../store/actions/user";

import "./css/Home.css";

const Home = ({ role, fetchUsers, token }) => {
  const history = useHistory();

  const slides = [
    {
      header: "Slide 1",
      description: "Description for slide 1",
      image:
        "https://www.bu.edu/chiefhealthoffice/files/2023/05/22-1623-AERIAL-248-1-3000x1248.jpg",
    },
    {
      header: "Slide 2",
      description: "Description for slide 2",
      image:
        "https://www.bu.edu/chiefhealthoffice/files/2023/05/21-1509-CAMPUS-211-1-3000x1248.jpg",
    },
    {
      header: "Slide 3",
      description: "Description for slide 3",
      image:
        "https://www.bu.edu/summer/files/2021/11/about-bu-2022-hero-1500x624.jpg",
    },
    {
      header: "Slide 4",
      description: "Description for slide 4",
      image:
        "https://www.bu.edu/summer/files/2021/11/faq-2022-hero-1500x624.jpg",
    },
  ];
  useEffect(() => {
    fetchUsers(token);
  }, [role, fetchUsers, token]);

  // localStorage.setItem('role', role);
  if (role !== "admin") {
    return (
      <div className="home-container">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          className="swiper-container"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <img alt={""} src={slide.image} className="slide-image" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="grid-container">
          <Header as="h3" textAlign="center" className="resource-header">
            Campus Resources
          </Header>
          <List className="resource-list">
            {role === "student" && (
              <List.Item>
                <Button
                  onClick={() => {
                    history.push("courseList");
                  }}
                  fluid
                  basic
                  color={"teal"}
                >
                  Student link
                </Button>
              </List.Item>
            )}
            {role === "teacher" && (
              <List.Item>
                <Button
                  onClick={() => {
                    history.push("courseList");
                  }}
                  fluid
                  basic
                  color={"teal"}
                >
                  Faculty link
                </Button>
              </List.Item>
            )}
            {/* <List.Item>
                  <Button
                    onClick={() => {
                      history.push('calendar')
                    }}
                    fluid basic color={'teal'}>
                    BU Calendar
                  </Button>
                </List.Item> */}
            {role === "teacher" && (
              <List.Item>
                <Button
                  onClick={() => {
                    history.push("createCourse");
                  }}
                  fluid
                  basic
                  color={"teal"}
                >
                  Create Course
                </Button>
              </List.Item>
            )}
          </List>
        </div>
      </div>
    );
  } else {
    return (
      <div className="admin-container">
        <Link to="/signup">
          <Button color="red" fluid size="large">
            User Registeration
          </Button>
        </Link>

        <Link to="/courseRegisteration">
          <Button color="teal" fluid size="large">
            Course Registeration
          </Button>
        </Link>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loadingUsers: state.user.loading,
    errorUsers: state.user.error,
    users: state.user.users,
    token: state.auth.token,
    role: state.auth.role,
  };
};

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
