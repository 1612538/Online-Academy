import { Switch, Route, Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Account from "./pages/Account";
import UserList from "./pages/UserList";
import TeacherList from "./pages/TeacherList";
import CategoryList from "./pages/CategoryList";
import MainCategoryList from "./pages/MainCategoryList";
import CourseList from "./pages/CourseList";
import CourseListByCat from "./pages/CourseListByCat";
import Error from "../error/ErrorPage";
import NavBar from "../../components/Admin/NavBar";
import SideBar from "../../components/Admin/SideBar";
import { useState } from "react";

const DefaultAdmin = ({ match, Component }) => {
  const [update, setUpdate] = useState(false);

  return (
    <>
      <NavBar></NavBar>
      <Grid container style={{ backgroundColor: "rgb(244, 246, 248)" }}>
        <Grid item xs={2}>
          <SideBar match={match} update={update}></SideBar>
        </Grid>
        <Grid
          item
          xs={10}
          style={{ padding: "50px", minHeight: "94vh", marginTop: "6vh" }}
        >
          <Component
            match={match}
            update={update}
            setUpdate={setUpdate}
          ></Component>
        </Grid>
      </Grid>
    </>
  );
};

const Admin = ({ match }) => {
  return (
    <>
      <Switch>
        <Route
          path={`${match.url}/account`}
          render={(props) => (
            <DefaultAdmin {...props} Component={Account}></DefaultAdmin>
          )}
        />
        <Route
          path={`${match.url}/users`}
          render={(props) => (
            <DefaultAdmin {...props} Component={UserList}></DefaultAdmin>
          )}
        />
        <Route
          path={`${match.url}/teachers`}
          render={(props) => (
            <DefaultAdmin {...props} Component={TeacherList}></DefaultAdmin>
          )}
        />
        <Route
          path={`${match.url}/maincategories/`}
          render={(props) => (
            <DefaultAdmin
              {...props}
              Component={MainCategoryList}
            ></DefaultAdmin>
          )}
        />
        <Route
          path={`${match.url}/categories/:id`}
          render={(props) => (
            <DefaultAdmin {...props} Component={CategoryList}></DefaultAdmin>
          )}
        />
        <Route
          exact
          path={`${match.url}/courses`}
          render={(props) => (
            <DefaultAdmin {...props} Component={CourseList}></DefaultAdmin>
          )}
        />
        <Route
          path={`${match.url}/courses/:id`}
          render={(props) => (
            <DefaultAdmin {...props} Component={CourseListByCat}></DefaultAdmin>
          )}
        />
        <Redirect
          exact
          from={`${match.url}/`}
          to={`${match.url}/account`}
        ></Redirect>
        <Route component={Error} />
      </Switch>
    </>
  );
};

export default Admin;
