import React, { useEffect, useState } from "react";
import { Grid, Typography, Avatar, Snackbar, Button } from "@material-ui/core";
import User from "./ProfileComponent/User";
import Teacher from "./ProfileComponent/Teacher";

import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "75%",
    backgroundColor: "rgba(255,255,255,0.5)",
    margin: "50px auto 0 auto",
    padding: "50px",
    borderRadius: "5px",
  },
  customGrid1: {
    width: "100%",
  },
  customGrid2: {
    width: "80%",
  },
  customText: {
    fontWeight: "bold",
    margin: "10px 30px 5px 30px",
  },
  customText2: {
    margin: "10px 20px 5px 20px",
  },
  customText3: {
    fontWeight: "bold",
    borderBottom: "1px solid black",
    paddingBottom: "2px",
    marginBottom: "20px",
    marginLeft: "30px",
  },
}));

let previousImage = "";

const ProfileBody = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [update, setUpdate] = useState(false);
  const [img, setImage] = useState(null);
  const [isChange, setChange] = useState(false);

  const getUser = async () => {
    const data = await axios.get(
      `http://localhost:8080/api/users/${localStorage.getItem("iduser")}`
    );
    previousImage = data.data.img;
    setUser(data.data);
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      let tmp = user;
      tmp.img = window.URL.createObjectURL(e.target.files[0]);
      setUser({ ...tmp });
      setImage(e.target.files[0]);
      setChange(true);
    }
  };

  const handleDataChange = async () => {
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    };
    let formData = new FormData();
    if (img !== null) formData.append("imageInput", img);
    const returnData = await axios.put(
      `http://localhost:8080/api/usersavatar/${user.iduser}`,
      formData,
      config
    );
    if (returnData.data.success === true) {
      let tmp = user;
      if (returnData.data.img !== "") {
        previousImage = returnData.data.img;
        tmp.img = returnData.data.img;
      }
      setUser({ ...tmp });
      setImage(null);
      setChange(false);
    }
  };

  const cancelChange = () => {
    let tmp = user;
    tmp.img = previousImage;
    setImage(null);
    setUser({ ...tmp });
    setChange(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
    return () => {
      setUser({});
    };
  }, [update]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        className={classes.customGrid1}
        spacing={4}
      >
        <Grid container item xs={8} spacing={2} alignItems="center">
          <Grid item xs={10}>
            <Typography variant="h5" className={classes.customText}>
              {user.username}
            </Typography>
            <Typography variant="h4" className={classes.customText}>
              {user.firstname + " " + user.lastname}
            </Typography>
            <Typography variant="h6" className={classes.customText}>
              {user.occupation}
            </Typography>
            <Typography variant="h6" className={classes.customText}>
              {user.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={4} justify="center" alignItems="center">
          <Button component="label" style={{ borderRadius: "50%" }}>
            <Avatar
              style={{ height: "250px", width: "250px" }}
              alt={user.firstname}
              src={
                isChange && img ? user.img : `http://localhost:8080${user.img}`
              }
            ></Avatar>
            <input
              type="file"
              hidden
              onChange={handleImage}
              required
              accept="image/*"
            />
          </Button>
        </Grid>
      </Grid>
      {localStorage.getItem("role") === "0" ? (
        <User user={user} update={update} setUpdate={setUpdate}></User>
      ) : localStorage.getItem("role") === "1" ? (
        <Teacher user={user} update={update} setUpdate={setUpdate}></Teacher>
      ) : (
        <Redirect to="/"></Redirect>
      )}
      <Snackbar
        open={isChange}
        action={
          <React.Fragment>
            Your changes haven't been saved.
            <Button
              color="secondary"
              variant="contained"
              style={{ margin: "10px", textTransform: "none" }}
              onClick={handleDataChange}
            >
              Save changes
            </Button>
            <Button
              variant="contained"
              className={classes.cancelButton}
              onClick={cancelChange}
            >
              Cancel
            </Button>
          </React.Fragment>
        }
      ></Snackbar>
    </div>
  );
};

export default ProfileBody;
