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
  MenuItem,
  InputLabel,
  Select,
  ListSubheader,
  FormControl,
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

function currentDate() {
  var date = new Date();
  var dateStr =
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2) +
    " " +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear();
  return dateStr;
}

const CourseForm = (props) => {
  const [small_cats, setSmall_Categories] = useState([]);
  const [name, setName] = useState("");
  const [cat, setCat] = useState(-1);
  const [price, setPrice] = useState(-1);
  const [briefDesc, setBriefDesc] = useState("");

  const getSmallCategories = () => {
    axios
      .get(`http://localhost:8080/api/smallcategories`)
      .then((res) => {
        const smallcats = res.data;
        setSmall_Categories(smallcats);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    };

    const data = {
      name: name === "" ? props.course.name : name,
      idsmall_category: cat === -1 ? props.course.idsmall_category : cat,
      price: price === -1 ? props.course.price : price,
      description1: briefDesc === "" ? props.course.description1 : briefDesc,
      lastupdate: currentDate(),
    };

    const returnData = await axios.put(
      `http://localhost:8080/api/courses/${props.course.idcourses}`,
      data,
      config
    );
    if (returnData.data.success) {
      props.EditClose();
      let tmp = props.course;
      tmp.name = data.name;
      tmp.idsmall_category = data.idsmall_category;
      tmp.price = data.price;
      tmp.description1 = data.description1;
      tmp.lastupdate = data.lastupdate;
      props.setCourse({ ...tmp });
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleCat = (e) => {
    setCat(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleBriefDesc = (e) => {
    setBriefDesc(e.target.value);
  };

  useEffect(() => {
    getSmallCategories();
    return () => {
      setSmall_Categories([]);
    };
  }, []);

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
                Edit course
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.customGrid}>
            <Grid container item xs={12} spacing={4}>
              <Grid item xs={7}>
                <TextField
                  defaultValue={props.course.name}
                  id="coursename"
                  label="Course name"
                  fullWidth
                  margin="normal"
                  helperText="No change if empty"
                  onChange={handleName}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="grouped-select">Category</InputLabel>
                  <Select
                    value={cat === -1 ? props.course.idsmall_category : cat}
                    id="grouped-select"
                    onChange={handleCat}
                  >
                    {small_cats.map((smallcat, key) => (
                      <MenuItem value={smallcat.idsmall_category} key={key}>
                        {smallcat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="price"
                  label="Price"
                  fullWidth
                  margin="normal"
                  helperText="No change if empty"
                  defaultValue={props.course.price}
                  onChange={handlePrice}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="briefdescription"
                label="Brief description"
                helperText="No change if empty"
                fullWidth
                defaultValue={props.course.description1}
                margin="normal"
                onChange={handleBriefDesc}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            component="button"
            variant="contained"
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

export default CourseForm;
