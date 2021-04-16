import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { userIsLoggedIn } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        userIsLoggedIn() && restricted ? (
          <Redirect to="/teams" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
