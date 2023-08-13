import React from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { authForgotPassword } from "../store/actions/auth";

class ForgotPassword extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    this.props.forgotPassword(email);
  };

  render() {
    const { error, loading, token } = this.props;
    const { email } = this.state;
    const formContainerStyle = {
      maxWidth: "700px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#eaf3f3",
      border: "1px solid #e0e0e0",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };
    if (token) {
      return <Redirect to="/home" />;
    }
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Enter Your email
          </Header>
          {error && <p>{this.props.error.message}</p>}

          <React.Fragment>
            <div style={formContainerStyle}>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    onChange={this.handleChange}
                    value={email}
                    name="email"
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Email"
                  />
                  <Button
                    color="teal"
                    fluid
                    size="large"
                    loading={loading}
                    disabled={loading}
                  >
                    Forgot Password
                  </Button>
                </Segment>
              </Form>
            </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (email) => dispatch(authForgotPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
