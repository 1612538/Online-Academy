import { Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Account from "./pages/Account";
import UserList from "./pages/UserList";
import TeacherList from "./pages/TeacherList";
import Error from "../error/ErrorPage";
import NavBar from "../../components/Admin/NavBar";
import SideBar from "../../components/Admin/SideBar";

const Admin = ({ match }) => {
  return (
    <>
      <NavBar></NavBar>
      <Grid container style={{ backgroundColor: "rgb(244, 246, 248)" }}>
        <Grid item xs={2}>
          <SideBar></SideBar>
        </Grid>
        <Grid
          item
          xs={10}
          style={{ padding: "50px", height: "120vh", marginTop: "6vh" }}
        >
          <Switch>
            <Route path={`${match.url}/account`} component={Account} />
            <Route path={`${match.url}/users`} component={UserList} />
            <Route path={`${match.url}/teachers`} component={TeacherList} />
            <Route component={Error} />
          </Switch>
        </Grid>
      </Grid>
    </>
  );
};

export default Admin;
