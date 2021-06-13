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
} from "@material-ui/core";

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

const InforForm = (props) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState("Invalid email address");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    };

    const test = await axios.get(
      `http://localhost:8080/api/usersByEmail/${email}`
    );
    if (test.data.email) {
      setErrorEmail(true);
      setErrorEmailText("Email has already been used");
    } else {
      const data = {
        username: username === "" ? props.user.username : username,
        firstname: firstname === "" ? props.user.firstname : firstname,
        lastname: lastname === "" ? props.user.lastname : lastname,
        occupation: occupation === "" ? props.user.occupation : occupation,
        email: email === "" ? props.user.email : email,
      };
      const returnData = await axios.put(
        `http://localhost:8080/api/users/${localStorage.getItem("iduser")}`,
        data,
        config
      );
      if (returnData.data.success) {
        setErrorEmail(false);
        setEmail("");
        props.EditClose();
        props.setUpdate(!props.update);
      }
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastname = (e) => {
    setLastname(e.target.value);
  };

  const handleOccupation = (e) => {
    setOccupation(e.target.value);
  };

  const handleEmail = (e) => {
    let re = /.+@.+\.[A-Za-z]+$/;
    if (e.target.value === "") {
      setEmail("");
      setErrorEmail(false);
    } else if (re.test(e.target.value)) {
      setEmail(e.target.value);
      setErrorEmail(false);
    } else {
      setErrorEmailText("Invalid email address");
      setErrorEmail(true);
    }
  };

  useEffect(() => {}, []);

  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
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
              {localStorage.getItem("role") === "0" ? (
                <Grid item xs={10}>
                  <TextField
                    id="username"
                    label="Username"
                    fullWidth
                    margin="normal"
                    helperText="No change if empty"
                    onChange={handleUsername}
                  />
                </Grid>
              ) : (
                <Grid item xs={10}>
                  <TextField
                    id="occupation"
                    label="Occupation"
                    fullWidth
                    margin="normal"
                    helperText="No change if empty"
                    onChange={handleOccupation}
                  />
                </Grid>
              )}
              <Grid item xs={5}>
                <TextField
                  id="firstname"
                  label="First name"
                  fullWidth
                  margin="normal"
                  helperText="No change if empty"
                  onChange={handleFirstname}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="lastname"
                  label="Last name"
                  fullWidth
                  margin="normal"
                  helperText="No change if empty"
                  onChange={handleLastname}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  id="email"
                  error={errorEmail}
                  helperText={
                    errorEmail ? errorEmailText : "No change if empty"
                  }
                  label="Email"
                  fullWidth
                  margin="normal"
                  onChange={handleEmail}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            component="button"
            variant="contained"
            disabled={
              (username === "" &&
                firstname === "" &&
                lastname === "" &&
                occupation === "" &&
                email === "") ||
              errorEmail === true
                ? true
                : false
            }
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

export default InforForm;
