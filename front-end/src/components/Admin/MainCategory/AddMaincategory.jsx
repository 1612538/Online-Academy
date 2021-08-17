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

const AddForm = (props) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    };
    const data = {
      name: name,
    };
    const returnData = await axios.post(
      `http://localhost:8080/api/categories`,
      data,
      config
    );
    if (returnData.data.success === true) {
      props.AddClose();
      props.setUpdate(!props.update);
    }
  };

  const handlename = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {}, []);

  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={props.AddClose}
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
                Add main category
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.customGrid}>
            <Grid container item xs={12} spacing={2} justify="center">
              <Grid item xs={12}>
                <TextField
                  id="name"
                  label="Name"
                  fullWidth
                  margin="normal"
                  required
                  onChange={handlename}
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
            disabled={name ? false : true}
            className={classes.customButton1}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            onClick={props.AddClose}
            className={classes.customButton2}
          >
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddForm;
