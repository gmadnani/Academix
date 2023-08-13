import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Icon,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import * as actions from "../store/actions/auth";

class CustomLayout extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <Menu fixed="top" style={{ backgroundColor: "#6A808C" }}>
          <Container>
            <Link to="/home">
              <Menu.Item
                header
                style={{
                  margin: "10px 10px",
                  border: "2px solid #b2d8d8",
                  borderRadius: "15px !important",
                  padding: "8px 12px",
                  transition: "all 0.3s",
                  boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#b2d8d8")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "")}
              >
                <Icon name="home" />
                Home
              </Menu.Item>
            </Link>
            {authenticated ? (
              <Link to="/login">
                <Menu.Item
                  header
                  onClick={() => this.props.logout()}
                  style={{
                    margin: "10px 10px",
                    border: "2px solid #b2d8d8",
                    borderRadius: "30px",
                    padding: "8px 12px",
                    transition: "all 0.3s",
                    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#b2d8d8")
                  }
                  onMouseOut={(e) => (e.target.style.backgroundColor = "")}
                >
                  <Icon name="sign-out" />
                  Logout
                </Menu.Item>
              </Link>
            ) : (
              <React.Fragment>
                <Link to="/login">
                  <Menu.Item
                    header
                    style={{
                      margin: "10px 10px",
                      border: "2px solid #b2d8d8",
                      borderRadius: "15px !important",
                      padding: "8px 12px",
                      transition: "all 0.3s",
                      boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#b2d8d8")
                    }
                    onMouseOut={(e) => (e.target.style.backgroundColor = "")}
                  >
                    <Icon name="sign-in" />
                    Login
                  </Menu.Item>
                </Link>
                {/* <Link to="/signup">
                  <Menu.Item
                    header
                    style={{
                      margin: "10px 10px",
                      border: "2px solid #b2d8d8",
                      borderRadius: "15px !important",
                      padding: "8px 12px",
                      transition: "all 0.3s",
                      boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#b2d8d8")
                    }
                    onMouseOut={(e) => (e.target.style.backgroundColor = "")}
                  >
                    <Icon name="user plus" />
                    Signup
                  </Menu.Item>
                </Link> */}
              </React.Fragment>
            )}
          </Container>
        </Menu>

        <div style={{ marginTop: "40px", backgroundColor: "#F0FFFF" }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomLayout)
);
