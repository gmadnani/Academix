import React from "react";
import { connect } from "react-redux";

class LoginForm extends React.Component {

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { token } = this.props;
    if (token) {
    }
    return 
  }
}

const mapStateToProps = state => {
  return {
    // loading: state.auth.loading,
    // error: state.auth.error,
    // token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // login: (username, password) => dispatch(authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);