import Home from "./layouts/main/Home";
import Search from "./layouts/main/Search";
import SignIn from "./layouts/signin/SignIn";
import SignUp from "./layouts/signup/SignUp";
import SignOut from "./layouts/signin/SignOut";
import Error from "./layouts/error/ErrorPage";
import TeacherProfile from "./layouts/profile/TeacherProfile";
import CoursesBySmallCats from "./layouts/main/CoursesBySmallCats";
import CoursesByMainCats from "./layouts/main/CoursesByMainCats";
import CourseDetail from "./layouts/courseDetail/CourseDetail";
import CourseLectures from "./layouts/courseDetail/CourseLectures";
import AccountProfile from "./layouts/profile/AccountProfile";
import VerifyAccount from "./layouts/VerifyAccount/VerifyAccount";

import Admin from "./layouts/Admin/Admin";

import { Router, Route, Switch } from "react-router-dom";
import History from "./components/History";
import { makeStyles } from "@material-ui/core/styles";
import BackgroundImage from "./assets/background.jpg";

import { PrivateRoute, AdminRoute } from "./routes/PrivateRoute";

import { isJwtExpired } from "jwt-check-expiration";

import "@fontsource/roboto";
import { useEffect } from "react";
import axios from "axios";

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
  const getToken = async () => {
    if (localStorage.getItem("accessToken")) {
      const check = isJwtExpired(localStorage.getItem("accessToken"));
      console.log("is expired: ", check);
      if (check) {
        const data = {
          refreshToken: localStorage.getItem("refreshToken"),
        };
        const returnData = await axios.post(
          "http://localhost:8080/refresh-token",
          data
        );
        if (returnData.data.accessToken) {
          localStorage.setItem("accessToken", returnData.data.accessToken);
        } else if (returnData.data.message) {
          History.push("/signout");
        }
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await getToken();
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <div className={classes.root}></div>
      <Router history={History}>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/search" component={Search} />
          <Route path="/signup" component={SignUp} />
          <Route
            path="/verifyaccount/:email/:verifykey"
            component={VerifyAccount}
          />
          <PrivateRoute path="/signout" component={SignOut} />
          <PrivateRoute path="/profile" component={AccountProfile} />
          <Route exact path="/" component={Home} />
          <Route
            path="/categories/:id"
            render={(props) => <CoursesBySmallCats {...props} />}
          />
          <Route
            path="/maincategories/:id"
            render={(props) => <CoursesByMainCats {...props} />}
          />
          <Route
            path="/lecturer/:id"
            render={(props) => <TeacherProfile {...props} />}
          />
          <Route
            exact
            path="/courses/:id"
            render={(props) => <CourseDetail {...props} />}
          />
          <PrivateRoute
            path="/courses/lectures/:id"
            component={CourseLectures}
          />
          <AdminRoute path="/admin" component={Admin}></AdminRoute>
          <Route component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
