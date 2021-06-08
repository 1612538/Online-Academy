import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import QueryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Success from "@material-ui/icons/CheckCircle";
import Fail from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  root1: {
    width: "70%",
    padding: "50px 50px 50px 50px",
    margin: "50px auto",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: "5px",
    color: "rgb(51, 204, 51)",
    textAlign: "center",
  },
  root2: {
    width: "70%",
    padding: "50px 50px 50px 50px",
    margin: "50px auto",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: "5px",
    color: "rgb(255, 51, 0)",
    textAlign: "center",
  },
}));

const VerifyAccount = (props) => {
  const classes = useStyles();
  const parsed = QueryString.parse(props.location.search);
  return (
    <div>
      <PageHeader></PageHeader>
      {parsed.success ? (
        <Paper className={classes.root1}>
          <Success></Success> Your account has been verified.
        </Paper>
      ) : (
        <Paper className={classes.root2}>
          <Fail></Fail> Your account verification has been failed. Please try
          again.
        </Paper>
      )}
    </div>
  );
};

export default VerifyAccount;
