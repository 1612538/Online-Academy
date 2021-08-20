import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Avatar,
  Link,
  Collapse,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { blue } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Infinite from "@material-ui/icons/AllInclusive";
import Phone from "@material-ui/icons/PhoneAndroid";
import "video-react/dist/video-react.css";
import Expand from "@material-ui/icons/ExpandMore";
import CourseList from "./CourseList";
import CourseFeedback from "./CourseFeedback";
import CourseContent from "./CourseContent";
import EditCourse from "./EditCourse";
import EditDetail from "./EditDetail";
import AddPhoto from "@material-ui/icons/AddPhotoAlternate";
import AddVideo from "@material-ui/icons/AddCircleRounded";

import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";

import History from "../../History";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "75%",
    backgroundColor: "rgba(255,255,255,0.5)",
    margin: "50px auto 50px auto",
    padding: "50px",
    borderRadius: "5px",
  },
  customGrid1: {
    width: "100%",
    marginTop: "15px",
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
  customBox: {
    border: "1px solid rgba(0,0,0,0.3)",
    margin: "20px auto 20px auto",
    width: "300px",
    padding: "20px",
  },
  rate: {
    color: "#3f51b5",
    fontWeight: "bold",
  },
  price: {
    color: "red",
    fontWeight: "bold",
  },
  bestseller: {
    padding: "4px 10px 4px 10px",
    backgroundColor: "#ffc107",
    color: "#f50057",
    boxShadow: "0 3px 4px 0px rgba(0,0,0,0.5)",
    borderBottomRightRadius: "3px",
    borderBottomLeftRadius: "3px",
    fontWeight: "bold",
    fontSize: "1rem",
    marginRight: 5,
    marginTop: "-5px",
  },
  newest: {
    padding: "4px 10px 4px 10px",
    backgroundColor: blue[500],
    color: "white",
    boxShadow: "0 3px 4px 0px rgba(0,0,0,0.5)",
    borderBottomRightRadius: "3px",
    borderBottomLeftRadius: "3px",
    fontWeight: "bold",
    fontSize: "1rem",
    marginTop: "-5px",
  },
  paper: {
    marginTop: "16px",
    backgroundColor: "transparent",
    padding: "15px 25px 15px 25px",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
    border: "1px solid rgba(0,0,0,0.3)",
    borderBottom: "0",
  },
  customButton: {
    background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.6))",
    color: "white",
    height: 40,
    padding: "30px 30px 5px 30px",
    width: "100%",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    textTransform: "none",
    border: "1px solid rgba(0,0,0,0.2)",
    borderTop: "0",
    marginTop: "-20px",
  },
  customDiv: {
    marginTop: "10px",
    padding: "5px",
    backgroundColor: "rgba(155,155,155,1)",
    color: "white",
    textAlign: "center",
  },
  customImageButton: {
    position: "absolute",
    top: "0",
    right: "0",
    backgroundColor: "rgb(180,180,180)",
    border: "0",
    borderBottomLeftRadius: "5px",
    boxShadow: "none",
    padding: "5px 0px",
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    borderRadius: "0",
    color: "white",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "rgb(160,160,160)",
    },
  },
  customVideoButton: {
    backgroundColor: "transparent",
    border: "0",
    boxShadow: "none",
    padding: "5px 0px",
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    borderRadius: "0",
    color: "rgb(180,180,180)",
    "&:hover": {
      boxShadow: "none",
      color: "rgb(220,220,220)",
      backgroundColor: "transparent",
    },
  },
  cancelButton: {
    backgroundColor: "transparent",
    margin: "10px 10px 10px 0px",
    color: "white",
    textTransform: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "rgb(80,80,80)",
    },
  },
}));

const StyledButton = withStyles({
  root: {
    width: "100%",
    backgroundColor: "#f44336",
    color: "white",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "#aa2e25",
      color: "#white",
    },
  },
})(Button);

const StyledButton2 = withStyles({
  root: {
    width: "100%",
    border: "2px solid #3d5afe",
    backgroundColor: "transparent",
    color: "#3d5afe",
    fontSize: "1rem",
    "&:hover": {
      border: "2px solid #1c54b2",
      backgroundColor: "transparent",
      color: "#1c54b2",
    },
  },
})(Button);

let previousImage = "";
let previousVideo = "";

const CourseBody = (props) => {
  const classes = useStyles();
  const [col1, setCol1] = useState(false);
  const [course, setCourse] = useState({});
  const [teacher, setTeacher] = useState({});
  const [bestseller, setBestSeller] = useState(false);
  const [newest, setNewest] = useState(false);

  const [isEnrolled, setEnrolled] = useState(false);
  const [isFavorite, setFavorite] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = React.useRef(null);
  const [editform, setEditForm] = useState(false);
  const [detailform, setDetailForm] = useState(false);
  const [isChange, setChange] = useState(false);

  const [img, setImage] = useState(null);
  const [pvideo, setPVideo] = useState(null);

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const EditClose = () => {
    setEditForm(false);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenMenu(false);
  };

  const DetailClose = () => {
    setDetailForm(false);
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      let tmp = course;
      tmp.img = window.URL.createObjectURL(e.target.files[0]);
      setCourse({ ...tmp });
      setImage(e.target.files[0]);
      setChange(true);
    }
  };

  const handlePVideo = (e) => {
    if (e.target.files[0]) {
      let tmp = course;
      tmp.previewvideo = window.URL.createObjectURL(e.target.files[0]);
      console.log(tmp.previewvideo);
      setCourse({ ...tmp });
      setPVideo(e.target.files[0]);
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
    if (pvideo !== null) formData.append("videoInput", pvideo);
    const returnData = await axios.put(
      `http://localhost:8080/api/courses/${props.match.params.id}`,
      formData,
      config
    );
    if (returnData.data.success === true) {
      let tmp = course;
      if (returnData.data.img !== "") {
        previousImage = returnData.data.img;
        tmp.img = returnData.data.img;
      }
      if (returnData.data.previewvideo !== "") {
        previousVideo = returnData.data.previewvideo;
        tmp.previewvideo = returnData.data.previewvideo;
      }
      setCourse({ ...tmp });
      setPVideo(null);
      setImage(null);
      setChange(false);
    }
  };

  const cancelChange = () => {
    let tmp = course;
    tmp.img = previousImage;
    tmp.previewvideo = previousVideo;
    setPVideo(null);
    setImage(null);
    setCourse({ ...tmp });
    setChange(false);
  };

  const getCourse = async () => {
    const data = await axios.get(
      `http://localhost:8080/api/courses/${props.match.params.id}`
    );
    if (data.data === null) {
      History.push("/error");
      return null;
    } else {
      setCourse(data.data);
      previousImage = data.data.img;
      previousVideo = data.data.previewvideo;
      const view = {
        views: parseInt(data.data.views) + 1,
      };
      const tmp = await axios.put(
        `http://localhost:8080/api/coursesView/${props.match.params.id}`,
        view
      );
      return data.data;
    }
  };

  const getTeacher = async (teacher) => {
    const data = await axios.get(`http://localhost:8080/api/users/${teacher}`);
    setTeacher(data.data);
  };

  const getBestSeller = async (id) => {
    const data = await axios.get(
      `http://localhost:8080/api/coursesbysubscribe`
    );
    if (data.data.find((object) => object.idcourses === id))
      setBestSeller(true);
  };

  const getNewest = async (id) => {
    const data = await axios.get(`http://localhost:8080/api/coursesbydate`);
    if (data.data.find((object) => object.idcourses === id)) setNewest(true);
  };

  const checkEnrolled = async () => {
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    };
    const data = await axios.get(
      `http://localhost:8080/api/enrolledcourses/${localStorage.getItem(
        "iduser"
      )}/${props.match.params.id}`,
      config
    );
    if (data.data.idcourses) setEnrolled(true);
    else setEnrolled(false);
  };

  const handleEnroll = async (sub) => {
    if (localStorage.getItem("iduser") === null) History.push("/signin");
    else {
      const config = {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      };
      const data = {
        iduser: localStorage.getItem("iduser"),
        idcourses: props.match.params.id,
      };
      const returnData = await axios.post(
        `http://localhost:8080/api/enrolledcourses`,
        data,
        config
      );
      if (returnData.data.success) {
        const subscribe = {
          subscribes: parseInt(sub) + 1,
        };
        const tmp = await axios.put(
          `http://localhost:8080/api/courses/${props.match.params.id}`,
          subscribe,
          config
        );
        const returnData2 = await axios.get(
          `http://localhost:8080/api/smallcategories/${course.idsmall_category}`
        );
        if (returnData2.data) {
          const data = { count: returnData2.data.count + 1 };
          const returnData3 = await axios.put(
            `http://localhost:8080/api/smallcategories/${course.idsmall_category}`,
            data
          );
          if (returnData3.data.success !== true)
            console.log("Failed count update");
        }
        setEnrolled(true);
      }
    }
  };

  const checkFavorite = async () => {
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    };
    const data = await axios.get(
      `http://localhost:8080/api/favoritecourses/${localStorage.getItem(
        "iduser"
      )}/${props.match.params.id}`,
      config
    );
    if (data.data.idcourses) setFavorite(true);
    else setFavorite(false);
  };

  const handleFavorite = async () => {
    if (localStorage.getItem("iduser") === null) {
      History.push("/signin");
    } else {
      const config = {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      };
      const data = {
        iduser: localStorage.getItem("iduser"),
        idcourses: props.match.params.id,
      };
      const returnData = await axios.post(
        `http://localhost:8080/api/favoritecourses`,
        data,
        config
      );
      if (returnData.data.success) setFavorite(true);
    }
  };

  const handleUnfavorite = async () => {
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    };
    const returnData = await axios.delete(
      `http://localhost:8080/api/favoritecourses/${localStorage.getItem(
        "iduser"
      )}/${props.match.params.id}`,
      config
    );
    if (returnData.data.success) {
      setFavorite(false);
    }
  };

  const handleClick1 = () => {
    setCol1(!col1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourse();
      if (data === null) {
        return;
      }
      await getTeacher(data.teacher);
      await getBestSeller(data.idcourses);
      await getNewest(data.idcourses);
      if (localStorage.getItem("iduser") !== null) {
        await checkEnrolled();
        await checkFavorite();
      }
    };
    fetchData();
    return () => {
      setCourse({});
      setTeacher({});
    };
  }, [props.match]);

  return (
    <div className={classes.root}>
      <Grid container direction="row" className={classes.customGrid1}>
        <Grid container item xs={8} spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.customText}>
              {course.name}
            </Typography>
            <Typography
              variant="h6"
              className={classes.customText}
              style={{ fontWeight: "normal" }}
            >
              {course.description1}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={4} justify="center" alignItems="center">
          <Grid item>
            <div style={{ position: "relative" }}>
              <img
                style={{ height: "170px", width: "300px" }}
                alt={course.name}
                src={
                  isChange && img
                    ? course.img
                    : "http://localhost:8080" + course.img
                }
              />
              {localStorage.getItem("iduser") &&
              parseInt(localStorage.getItem("iduser")) === teacher.iduser ? (
                <Button
                  variant="contained"
                  component="label"
                  className={classes.customImageButton}
                >
                  <AddPhoto></AddPhoto>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      handleImage(e);
                    }}
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                  />
                </Button>
              ) : (
                undefined
              )}
            </div>
          </Grid>
          <Grid item container xs={12} justify="center">
            {bestseller ? (
              <Grid item>
                <div className={classes.bestseller}>Bestseller</div>
              </Grid>
            ) : (
              undefined
            )}
            {newest ? (
              <Grid item>
                <div className={classes.newest}>New</div>
              </Grid>
            ) : (
              undefined
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.customGrid1} spacing={4}>
        <Grid item xs={8}>
          <Typography
            variant="h5"
            className={classes.customText3}
            component="div"
          >
            Preview video
            {localStorage.getItem("iduser") &&
            parseInt(localStorage.getItem("iduser")) === teacher.iduser ? (
              <Button
                variant="contained"
                component="label"
                className={classes.customVideoButton}
              >
                <AddVideo></AddVideo>
                <input
                  type="file"
                  hidden
                  accept="video/*"
                  onChange={(e) => {
                    handlePVideo(e);
                  }}
                  onClick={(e) => {
                    e.target.value = null;
                  }}
                />
              </Button>
            ) : (
              undefined
            )}
          </Typography>
          <div style={{ margin: "20px 0 20px 20px" }}>
            <Player
              poster={
                isChange && img
                  ? course.img
                  : "http://localhost:8080" + course.img
              }
              key={course.previewvideo}
            >
              <source
                src={
                  isChange && pvideo
                    ? course.previewvideo
                    : "http://localhost:8080" + course.previewvideo
                }
              />
              <ControlBar autoHide>
                <ReplayControl seconds={10} order={1.1} />
                <ForwardControl seconds={30} order={1.2} />
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <PlaybackRateMenuButton
                  rates={[5, 2, 1, 0.5, 0.1]}
                  order={7.1}
                />
                <VolumeMenuButton order={7.2} />
              </ControlBar>
            </Player>
          </div>
          <Typography variant="h5" className={classes.customText3}>
            Course content
          </Typography>
          <CourseContent idcourse={props.match.params.id}></CourseContent>
          <Typography variant="h5" className={classes.customText3}>
            About course
          </Typography>
          <div
            className={classes.customText2}
            dangerouslySetInnerHTML={{ __html: course.description2 }}
          ></div>
        </Grid>
        <Grid item xs={4}>
          <Grid container className={classes.customBox} spacing={2}>
            <Grid container item xs={12} direction="row">
              <Grid item xs={7}>
                <Typography variant="h6">Price: </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h5" className={classes.price}>
                  ${course.price}
                </Typography>
              </Grid>
            </Grid>
            {localStorage.getItem("role") === "0" ||
            localStorage.getItem("role") === "2" ||
            localStorage.getItem("role") === null ? (
              <>
                {isEnrolled === false ? (
                  <Grid item xs={12}>
                    <StyledButton
                      onClick={() => handleEnroll(course.subscribes)}
                    >
                      Enroll
                    </StyledButton>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <StyledButton
                      href={"/courses/lectures/" + props.match.params.id}
                    >
                      View lectures
                    </StyledButton>
                  </Grid>
                )}
                {isFavorite === false ? (
                  <Grid item xs={12}>
                    <StyledButton2 onClick={handleFavorite}>
                      Add to favorites
                    </StyledButton2>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <StyledButton2 onClick={handleUnfavorite}>
                      Remove favorite
                    </StyledButton2>
                  </Grid>
                )}
              </>
            ) : localStorage.getItem("role") === "1" &&
              parseInt(localStorage.getItem("iduser")) === teacher.iduser ? (
              <>
                <Grid item xs={12}>
                  <StyledButton
                    href={"/courses/lectures/" + props.match.params.id}
                  >
                    View lectures
                  </StyledButton>
                </Grid>
                <Grid item xs={12}>
                  <StyledButton2
                    ref={anchorRef}
                    aria-controls={openMenu ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    Edit course
                  </StyledButton2>
                </Grid>
                <Popper
                  open={openMenu}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                  style={{ zIndex: "2" }}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
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
                              Edit course information
                            </MenuItem>
                            <MenuItem
                              onClick={(e) => {
                                handleClose(e);
                                setDetailForm(true);
                              }}
                            >
                              Edit course detail
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </>
            ) : (
              undefined
            )}
            <Grid container item direction="row" xs={12}>
              <Grid item xs={3}>
                <Typography variant="body1">Rating:</Typography>
              </Grid>
              <Grid item xs={1} className={classes.rate}>
                {course.rate}
              </Grid>
              <Grid item xs={4} style={{ marginLeft: "6px", marginTop: "2px" }}>
                <Rating
                  size="small"
                  name="read-only"
                  precision={0.5}
                  value={parseFloat(course.rate)}
                  readOnly
                />
              </Grid>
              <Grid item xs={2} style={{ marginLeft: "10px" }}>
                ({course.ratevotes})
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                Last update: {course.lastupdate}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">This course includes: </Typography>
              <Typography variant="body2">
                <Infinite
                  fontSize="small"
                  style={{ margin: "5px 10px -4px 0" }}
                ></Infinite>
                Full lifetime access{" "}
              </Typography>
              <Typography variant="body2">
                <Phone
                  fontSize="small"
                  style={{ margin: "5px 10px -4px 0" }}
                ></Phone>
                Access on mobile and TV{" "}
              </Typography>
              <Typography
                variant="body1"
                className={classes.customDiv}
                style={
                  course.isCompleted === 1
                    ? { backgroundColor: "rgba(139,195,74,1)" }
                    : {}
                }
              >
                {course.isCompleted === 1 ? "Completed" : "In progress"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CourseList catID={course.idsmall_category}></CourseList>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" className={classes.customText3}>
            Instructors
          </Typography>
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <Link href={"/lecturer/" + teacher.iduser}>
                <Avatar
                  style={{ height: "120px", width: "120px" }}
                  alt={teacher.firstname + " " + teacher.lastname}
                  src={"http://localhost:8080/" + teacher.img}
                />
              </Link>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {teacher.firstname + " " + teacher.lastname}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {teacher.occupation}
              </Typography>
            </Grid>
            <Grid item>
              <Collapse in={col1} collapsedHeight={150}>
                <Paper elevation={0} className={classes.paper}>
                  <Typography
                    variant="body1"
                    className={classes.customText2}
                    dangerouslySetInnerHTML={{ __html: teacher.information }}
                  ></Typography>
                </Paper>
              </Collapse>
              <Button className={classes.customButton} onClick={handleClick1}>
                <Expand></Expand>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" className={classes.customText3}>
            Student feedback
          </Typography>
          <CourseFeedback
            isEnrolled={isEnrolled}
            idcourse={course.idcourses}
            rate={course.rate}
            votes={course.ratevotes}
            setCourse={setCourse}
          ></CourseFeedback>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Expand></Expand>
          </Grid>
        </Grid>
      </Grid>
      <EditCourse
        EditClose={EditClose}
        open={editform}
        course={course}
        setCourse={setCourse}
      ></EditCourse>
      <EditDetail
        EditClose={DetailClose}
        open={detailform}
        course={course}
        setCourse={setCourse}
      ></EditDetail>
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

export default CourseBody;
