import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../../App";

const PrivetRoute = ({ children, ...rest }) => {
  const { loggedInUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivetRoute;
