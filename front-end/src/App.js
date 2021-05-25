import Home from "./layouts/main/Home";
import Search from "./layouts/main/Search";
import SignIn from "./layouts/signin/SignIn";
import SignUp from "./layouts/signup/SignUp";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BackgroundImage from "./assets/background.jpg";
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
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SignIn} />
        <Route path="/search" component={Search} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
