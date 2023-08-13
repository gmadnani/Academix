import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.auth.token);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (token !== undefined) {
      setShouldRender(true);
    }
  }, [token]);

  if (!shouldRender) return null;

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
