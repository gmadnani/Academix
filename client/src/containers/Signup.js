import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { authSignup } from "../store/actions/auth";

class RegistrationForm extends React.Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password1, password2 } = this.state;
    this.props.signup(username, email, password1, password2);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, email, password1, password2 } = this.state;
    const { error, loading, registrationSuccess } = this.props;
    const formContainerStyle = {
      maxWidth: "700px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#eaf3f3",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Signup to your account
          </Header>
          {error && <p>{this.props.error.message}</p>}
          {registrationSuccess && (
            <Message success icon>
              <Icon name="checkmark" />
              <Message.Content>
                <Message.Header>
                  You have successfully registered.
                </Message.Header>
              </Message.Content>
            </Message>
          )}

          <React.Fragment>
            <div style={formContainerStyle}>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    onChange={this.handleChange}
                    value={username}
                    name="username"
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    value={email}
                    name="email"
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="E-mail address"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    fluid
                    value={password1}
                    name="password1"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />
                  <Form.Input
                    onChange={this.handleChange}
                    fluid
                    value={password2}
                    name="password2"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Confirm password"
                    type="password"
                  />

                  <Button
                    color="teal"
                    fluid
                    size="large"
                    loading={loading}
                    disabled={loading}
                  >
                    Signup
                  </Button>
                </Segment>
              </Form>
            </div>
            <Message>
              <NavLink to="/">Back to Dashboard</NavLink>
            </Message>
          </React.Fragment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    registrationSuccess: state.auth.registrationSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (username, email, password1, password2) =>
      dispatch(authSignup(username, email, password1, password2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
