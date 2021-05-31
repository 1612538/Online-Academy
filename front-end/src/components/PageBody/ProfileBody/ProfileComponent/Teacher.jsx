import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Fade,
  Box,
  Fab,
  Tooltip,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { makeStyles } from "@material-ui/core/styles";
import CoursesCard from "../../../CoursesCard/CoursesCard";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CourseForm from "./CourseForm";
import InforForm from "./UserForm";
import PasswordForm from "./PasswordForm";
import AboutMeForm from "./AboutMeForm";

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

const ProfileBody = (props) => {
  const classes = useStyles();
  const [courses, setCourses] = React.useState([]);
  const [currPage, setCurrPage] = React.useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(true);
  const [addform, setAddForm] = useState(false);

  const [openMenu, setOpenMenu] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [editform, setEditForm] = useState(false);
  const [passwordform, setPasswordForm] = useState(false);
  const [aboutmeform, setAboutMeForm] = useState(false);

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

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenMenu(false);
  };

  const EditClose = () => {
    setEditForm(false);
  };

  const PasswordClose = () => {
    setPasswordForm(false);
  };

  const AboutMeClose = () => {
    setAboutMeForm(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await setUser(props.user);
      await getCourses(currPage);
      await getLength();
    };

    fetchData();
    return () => {
      setCourses([]);
    };
  }, [currPage, props.user]);

  return (
    <Grid container className={classes.customGrid1} spacing={4}>
      <Grid container item xs={8} spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h5" className={classes.customText3}>
            About me
          </Typography>
        </Grid>
        <Typography
          variant="body1"
          className={classes.customText2}
          key={Date()}
          dangerouslySetInnerHTML={{ __html: user.information }}
        ></Typography>
      </Grid>
      <Grid
        container
        item
        xs={4}
        justify="center"
        alignItems="center"
        style={{ height: "200px" }}
      >
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
        <CourseForm AddClose={AddClose} open={addform}></CourseForm>
        <Grid item>
          <Tooltip
            title=""
            aria-label="edit"
            ref={anchorRef}
            aria-controls={openMenu ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Fab color="primary" className={classes.absolute}>
              <EditIcon /> Edit information
            </Fab>
          </Tooltip>
        </Grid>
        <Popper
          open={openMenu}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="menu-list-grow">
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        setEditForm(true);
                      }}
                    >
                      Edit information
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        setAboutMeForm(true);
                      }}
                    >
                      Edit "About me"
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        setPasswordForm(true);
                      }}
                    >
                      Change password
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <InforForm
          EditClose={EditClose}
          open={editform}
          user={props.user}
          update={props.update}
          setUpdate={props.setUpdate}
        ></InforForm>
        <PasswordForm
          EditClose={PasswordClose}
          open={passwordform}
        ></PasswordForm>
        <AboutMeForm
          EditClose={AboutMeClose}
          open={aboutmeform}
          user={props.user}
          update={props.update}
          setUpdate={props.setUpdate}
        ></AboutMeForm>
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
    </Grid>
  );
};

export default ProfileBody;
