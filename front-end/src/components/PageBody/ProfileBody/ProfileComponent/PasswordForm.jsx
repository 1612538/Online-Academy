import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "85%",
    paddingTop: "50px !important",
    padding: "0px 50px 10px 50px",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "5px",
  },
  customText3: {
    fontWeight: "bold",
    borderBottom: "1px solid black",
    paddingBottom: "2px",
    marginBottom: "20px",
  },
  customButton1: {
    margin: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    "&:hover": {
      backgroundColor: "#357a38",
    },
  },
  customButton2: {
    margin: "10px",
    backgroundColor: "#35baf6",
    color: "white",
    "&:hover": {
      backgroundColor: "#2196f3",
    },
  },
  customGrid: {
    width: "90%",
    margin: "auto",
  },
  formControl: {
    width: "160px",
    marginTop: "16px",
  },
}));

const PasswordForm = (props) => {
  const [oldpassword, setOldPassword] = useState("");
  const [verify, setVerify] = useState("");
  const [password, setPassword] = useState("");
  const [error1, setError1] = useState(false);
  const [error1Text, setError1Text] = useState("");
  const [error2, setError2] = useState(false);
  const [error2Text, setError2Text] = useState("");
  const [error3, setError3] = useState(false);
  const [open, setOpen] = useState(false);
  const [error3Text, setError3Text] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    };
    const url = `http://localhost:8080/api/checkpassword/${localStorage.getItem(
      "iduser"
    )}/${oldpassword}`;
    console.log(url);
    const equal = await axios.get(url);
    if (equal.data.isEqual === false) {
      setError1(true);
      setError1Text("Old password isn't correct.");
      setError2(false);
      setError2Text(false);
      setError3(false);
      setError3Text(false);
    } else if (oldpassword === password) {
      setError2(true);
      setError2Text("Old password and new password are the same.");
      setError1(false);
      setError1Text(false);
      setError3(false);
      setError3Text(false);
    } else if (verify !== password) {
      setError3(true);
      setError3Text("Password and verify password are different.");
      setError1(false);
      setError1Text(false);
      setError2(false);
      setError2Text(false);
    } else {
      const data = {
        password: password,
      };
      const returnData = await axios.put(
        `http://localhost:8080/api/users/${localStorage.getItem("iduser")}`,
        data,
        config
      );
      if (returnData.data.success) {
        setOpen(true);
        setTimeout(() => {
          props.EditClose();
        }, 2000);
      }
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const handleVerify = (e) => {
    setVerify(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {}, []);

  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={props.EditClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit}>
        <DialogContent className={classes.root}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.customText3}>
                Edit information
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.customGrid}>
            <Grid container item xs={12} spacing={2} justify="center">
              <Grid item xs={10}>
                <TextField
                  id="oldpassword"
                  type="password"
                  label="Old Password"
                  error={error1}
                  helperText={error1Text}
                  fullWidth
                  margin="normal"
                  required
                  onChange={handleOldPassword}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="newpassword"
                  type="password"
                  label="New password"
                  error={error2}
                  helperText={error2Text}
                  fullWidth
                  margin="normal"
                  required
                  onChange={handlePassword}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="verify"
                  label="Verify new password"
                  type="password"
                  error={error3}
                  helperText={error3Text}
                  fullWidth
                  margin="normal"
                  required
                  onChange={handleVerify}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert variant="filled" onClose={handleClose} severity="success">
            Password has been changed.
          </Alert>
        </Snackbar>
        <DialogActions>
          <Button
            type="submit"
            component="button"
            variant="contained"
            disabled={password && oldpassword && verify ? false : true}
            className={classes.customButton1}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            onClick={props.EditClose}
            className={classes.customButton2}
          >
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PasswordForm;
