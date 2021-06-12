import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  Grow,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

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
  customGrid2: {
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    width: "160px",
    marginTop: "16px",
  },
}));

const AddForm = (props) => {
  const [occupation, setOccupation] = useState("");
  const [password, setPassword] = useState("");
  const [vpassword, setVPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [fail, setFail] = useState(false);
  const [success, setSuccess] = useState(false);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState("Invalid email address");

  const handleOccupation = (e) => {
    setOccupation(e.target.value);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    let re = /.+@.+\.[A-Za-z]+$/;
    if (re.test(e.target.value)) {
      setEmail(e.target.value);
      setErrorEmail(false);
    } else {
      setErrorEmailText("Invalid email address");
      setErrorEmail(true);
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleVPassword = (e) => {
    setVPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== vpassword) {
      setFail(true);
      setSuccess(false);
    } else {
      axios
        .get(`http://localhost:8080/api/usersByEmail/${email}`)
        .then((res) => {
          const data = res.data;
          if (data.email) {
            setErrorEmail(true);
            setErrorEmailText("Email has already been used");
            setSuccess(false);
            setFail(false);
          } else {
            const data = {
              username: "Instructor",
              password: password,
              email: email,
              firstname: firstName,
              lastname: lastName,
              isBlocked: 0,
              occupation: occupation,
              role: 1,
              isVerify: 0,
            };
            axios
              .post(`http://localhost:8080/api/users`, data)
              .then((res) => {
                setSuccess(res.data.success);
                setTimeout(() => {
                  props.AddClose();
                  props.setUpdate(!props.update);
                }, 3000);
              })
              .catch((err) => console.log(err));
            setFail(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={props.AddClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="md"
    >
      <form onSubmit={handleSubmit}>
        <DialogContent className={classes.root}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.customText3}>
                Add teacher
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid container item xs={10} spacing={2} justify="center">
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  error={errorEmail}
                  helperText={errorEmail ? errorEmailText : undefined}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="off"
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={handleFirstName}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={handleLastName}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Occupation"
                  label="Occupation"
                  name="Occupation"
                  autoComplete="off"
                  autoFocus
                  onChange={handleOccupation}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handlePassword}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="verifypassword"
                  label="Verify Password"
                  type="password"
                  id="verifypassword"
                  autoComplete="current-password"
                  onChange={handleVPassword}
                />
              </Grid>
              <Grid item xs={10} className={classes.customGrid2}>
                {success ? (
                  <Grow in={success}>
                    <Alert severity="success" variant="filled">
                      Teacher's account is created!
                      <br /> Activated link has been sent to email <br />
                    </Alert>
                  </Grow>
                ) : undefined}
                {fail ? (
                  <Grow in={fail}>
                    <Alert severity="error" variant="filled">
                      Some fields is incorrent. Please check again!
                    </Alert>
                  </Grow>
                ) : undefined}
              </Grid>
            </Grid>
            <Grid container item xs={8} justify="flex-end">
              <Button
                type="submit"
                variant="contained"
                className={classes.customButton1}
              >
                Sign Up
              </Button>
              <Button
                variant="contained"
                onClick={props.AddClose}
                className={classes.customButton2}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddForm;
