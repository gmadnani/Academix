import React from "react";
import { connect } from "react-redux";
import "swiper/css";
import { useHistory, useLocation } from "react-router-dom";
import { Link, withRouter } from "react-router-dom";
import { Tab } from "semantic-ui-react";
import Assignment from "../containers/Courses/Assignment";
const CoursesLayout = (props) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(document.location.search)

  const handleChange = (e, data) => {
    const params = new URLSearchParams({ ["tab"]: data.activeIndex });
    history.replace({ pathname: location.pathname, search: params.toString() });
  };

  const panes = [
    {
      menuItem: "Content",
      render: () => (
        <Tab.Pane style={{ height: "700px" }}>
          <h1>Content</h1>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Assignment",
      render: () => (
        <Tab.Pane style={{ height: "700px" }}>
          {" "}
          <Assignment></Assignment>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Quizzes",
      render: () => (
        <Tab.Pane style={{ height: "700px" }}>
          <h1>Quizzes</h1>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "My Grades",
      render: () => (
        <Tab.Pane style={{ height: "700px" }}>
          <h1>My Grades</h1>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Discussion Forum",
      render: () => (
        <Tab.Pane style={{ height: "700px" }}>
          <h1>Discussion Forum</h1>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div style={{ minHeight: "60vh", padding: "50px 0" }}>
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition="left"
        panes={panes}
        defaultActiveIndex={searchParams.get('tab')}
        onTabChange={handleChange}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    role: state.auth.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // login: (username, password) => dispatch(authLogin(username, password))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CoursesLayout)
);
