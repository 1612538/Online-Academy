
import {Route, Redirect} from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
          {...rest}
          render={props =>
            localStorage.getItem('iduser') ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
}

export default PrivateRoute;