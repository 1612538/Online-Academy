import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";
const useStyles = makeStyles({
    root: {
      position: "fixed",
      width: "100%",
      height: "100vh",
      backgroundColor: `#fff`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      zIndex: "0",
      overflow: "hidden",
    },
  });
const ErrorPage = () => {
    const classes = useStyles();
    return (
        <div>
        <div className={classes.root}></div>
        <div className="notf">
		    <div className="notfound">
			    <div className="notfound-404">
				<h1>Oops!</h1>
				<h2>404 - The Page can't be found</h2>
			    </div>
			<a href="/">Go TO Homepage</a>
		</div>
	</div>
    </div>
    );
}

export default ErrorPage;