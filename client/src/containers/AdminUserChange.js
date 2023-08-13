import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Segment, Header, Button, Dropdown, Form } from "semantic-ui-react";
import { fetchUsers } from "../store/actions/user";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AdminUserChange = ({ users, fetchUsers, token }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchUsers(token);
  }, [fetchUsers, token]);

  const handleUserChange = (event, data) => {
    setSelectedUser(data.value);
  };

  const handleRoleChange = (event, data) => {
    setSelectedRole(data.value);
  };

  const handleRegister = () => {
    if (selectedUser && selectedRole) {
      //   const user = { owner: selectedUser };

      axios
        .put(
          `http://127.0.0.1:8000/users/roles/`,
          {
            owner: selectedUser,
            role: selectedRole,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((response) => {
          setSuccessMessage("Role changed successfully.");
          setTimeout(() => {
            setSuccessMessage("");
            history.push("/home");
          }, 2000);
        })
        .catch((error) => {
          console.error("Role change error:", error);
        });
    }
  };

  return (
    <div className="admin-panel">
      <Header as="h3" textAlign="center">
        Admin User Role Change
      </Header>
      <Segment>
        <Form>
          <Form.Field>
            <label>Select User</label>
            <Dropdown
              placeholder="Select User"
              fluid
              search
              selection
              options={users.map((user) => ({
                key: user.id,
                value: user.owner,
                text: user.owner,
              }))}
              value={selectedUser}
              onChange={handleUserChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Select Role</label>
            <Dropdown
              placeholder="Select Role"
              fluid
              selection
              options={[
                { key: "student", value: "student", text: "Student" },
                { key: "teacher", value: "teacher", text: "Teacher" },
              ]}
              value={selectedRole}
              onChange={handleRoleChange}
            />
          </Form.Field>
          <Button onClick={handleRegister} primary>
            Change Role
          </Button>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </Form>
      </Segment>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    token: state.auth.token,
  };
};

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserChange);
