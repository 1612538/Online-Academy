import React, { useEffect, useState } from "react";
import { Grid, Typography, Fade, Box, Fab, Tooltip } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { makeStyles } from "@material-ui/core/styles";
import CoursesCard from "../../../CoursesCard/CoursesCard";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CourseForm from "./CourseForm";

import axios from "axios";

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
  customPagination: {
    color: "white",
  },
  selected: {
    backgroundColor: "rgba(255,255,255, 0.7) !important",
    color: "black",
  },
  absolute: {
    width: "200px",
  },
}));

const ProfileBody = () => {
  const classes = useStyles();
  const [courses, setCourses] = React.useState([]);
  const [currPage, setCurrPage] = React.useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(true);
  const [addform, setAddForm] = useState(false);

  const getUser = async () => {
    const data = await axios.get(
      `http://localhost:8080/api/users/${localStorage.getItem("iduser")}`
    );
    setUser(data.data);
  };

  const getCourses = async (current) => {
    const data = await axios.get(
      `http://localhost:8080/api/getByTeacher/${localStorage.getItem(
        "iduser"
      )}?page=${current}`,
      { headers: { "x-access-token": localStorage.getItem("accessToken") } }
    );
    if (!data.data.message) setCourses(data.data);
    setOpen(true);
  };

  const getLength = async () => {
    const length = await axios.get(
      `http://localhost:8080/api/getByTeacher/${localStorage.getItem(
        "iduser"
      )}`,
      { headers: { "x-access-token": localStorage.getItem("accessToken") } }
    );
    setPageNumber(Math.ceil(length.data.length / 5));
  };

  const changeHandle = (event, value) => {
    setOpen(false);
    setTimeout(() => setCurrPage(value), 500);
  };

  const AddClose = () => {
    setAddForm(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      await getCourses(currPage);
      await getLength();
    };
    fetchData();
    return () => {
      setUser({});
      setCourses([]);
    };
  }, [currPage]);

  return (
    <Grid container className={classes.customGrid1} spacing={4}>
      <Grid container item xs={8} spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h5" className={classes.customText3}>
            About me
          </Typography>
        </Grid>
        <Typography variant="body1" className={classes.customText2}>
          {user.information}
        </Typography>
      </Grid>
      <Grid container item xs={4} justify="center" alignItems="center">
        <Grid item>
          <Tooltip
            title=""
            aria-label="add"
            onClick={() => {
              setAddForm(true);
            }}
          >
            <Fab color="secondary" className={classes.absolute}>
              <AddIcon /> Create course
            </Fab>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="" aria-label="edit">
            <Fab color="primary" className={classes.absolute}>
              <EditIcon /> Edit information
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.customText3}>
          My courses
        </Typography>
        <Fade in={open} timeout={500}>
          <Grid container spacing={3} justify="center">
            {courses.map((course, key) => (
              <Grid item key={key}>
                <CoursesCard course={course}></CoursesCard>
              </Grid>
            ))}
          </Grid>
        </Fade>
        <Box my={1} display="flex" justifyContent="center">
          <Pagination
            count={pageNumber ? pageNumber : 1}
            defaultPage={1}
            onChange={changeHandle}
            size="large"
            renderItem={(item) => (
              <PaginationItem
                {...item}
                className={classes.customPagination}
                classes={{ selected: classes.selected }}
              />
            )}
          />
        </Box>
      </Grid>
      <CourseForm AddClose={AddClose} open={addform}></CourseForm>
    </Grid>
  );
};

export default ProfileBody;
