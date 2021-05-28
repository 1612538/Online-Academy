import Home from "./layouts/main/Home";
import Search from "./layouts/main/Search";
import SignIn from "./layouts/signin/SignIn";
import SignUp from "./layouts/signup/SignUp";
import SignOut from "./layouts/signin/SignOut";
import Error from "./layouts/error/ErrorPage";
import AccountProfile from "./layouts/profile/AccountProfile";
import CoursesBySmallCats from "./layouts/main/CoursesBySmallCats";
import CourseDetail from "./layouts/courseDetail/CourseDetail";

import { Router, Route, Switch } from "react-router-dom";
import History from "./components/History";
import { makeStyles } from "@material-ui/core/styles";
import BackgroundImage from "./assets/background.jpg";

import PrivateRoute from "./routes/PrivateRoute";

import "@fontsource/roboto";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${BackgroundImage})`,
    backgroundColor: `rgba(1,11,46)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    zIndex: "-1",
    overflow: "hidden",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.root}></div>
      <Router history={History}>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/search" component={Search} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/signout" component={SignOut} />
          <Route exact path="/" component={Home} />
          <Route
            path="/categories/:id"
            render={(props) => <CoursesBySmallCats {...props} />}
          />
          <Route path="/404Error" component={Error} />
          <Route
            path="/lecturer/:id"
            render={(props) => <AccountProfile {...props} />}
          />
          <Route
            path="/courses/:id"
            render={(props) => <CourseDetail {...props} />}
          />
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
