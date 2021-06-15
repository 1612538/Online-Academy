import {
  Grid,
  Typography,
  Avatar,
  Dialog,
  DialogContent,
  DialogActions,
  Fade,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CoursesCard from "../../CoursesCard/CoursesCard";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

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

const ProfileBody = ({ openD, DialogClose, user }) => {
  const classes = useStyles();

  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [currPage, setCurrPage] = useState(1);

  const getCourses = async (current) => {
    if (user.iduser) {
      const data = await axios.get(
        `http://localhost:8080/api/getByTeacher/${user.iduser}?page=${current}`
      );
      setCourses([...data.data]);
      setOpen(true);
    }
  };

  const getLength = async () => {
    const length = await axios.get(
      `http://localhost:8080/api/getByTeacher/${user.iduser}`
    );
    setPageNumber(Math.ceil(length.data.length / 5));
  };

  const changeHandle = (event, value) => {
    setOpen(false);
    setTimeout(() => setCurrPage(value), 500);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCourses(currPage);
      await getLength();
    };
    fetchData();
    return () => {};
  }, [currPage, user]);

  return (
    <Dialog
      open={openD}
      onClose={DialogClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="xl"
    >
      <DialogContent className={classes.root}>
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
            <Avatar
              style={{ height: "250px", width: "250px" }}
              alt={user.firstname}
              src={`http://localhost:8080/${user.img}`}
            />
          </Grid>
        </Grid>

        <Grid container className={classes.customGrid1} spacing={4}>
          <Grid container item xs={8} spacing={2}>
            <Grid item xs={10}>
              <Typography variant="h5" className={classes.customText3}>
                About {user.firstname + user.lastname}
              </Typography>
            </Grid>
            <Typography
              variant="body1"
              className={classes.customText2}
              key={Date()}
              dangerouslySetInnerHTML={{ __html: user.information }}
            ></Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.customText3}>
              My courses
            </Typography>
            <Fade in={open} timeout={500}>
              <Grid
                container
                spacing={3}
                justify="center"
                style={{ height: "700px" }}
              >
                {courses.map((course, key) => (
                  <Grid item key={key}>
                    <CoursesCard course={course}></CoursesCard>
                  </Grid>
                ))}
              </Grid>
            </Fade>
            {courses.length > 0 ? (
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
            ) : undefined}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            DialogClose();
            setTimeout(() => {
              setCurrPage(1);
            }, 500);
          }}
          className={classes.customButton2}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileBody;
