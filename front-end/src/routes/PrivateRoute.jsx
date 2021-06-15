import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("iduser") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("iduser") &&
        localStorage.getItem("role") === "2" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/error",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export { AdminRoute, PrivateRoute };
