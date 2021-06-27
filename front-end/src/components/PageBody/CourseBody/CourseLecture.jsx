import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Snackbar,
  IconButton,
  Fade,
} from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "video-react/dist/video-react.css";
import { useBeforeunload } from "react-beforeunload";
import CloseIcon from "@material-ui/icons/Close";
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
import LectureCard from "./LectureCard";
import LectureForm from "./Lectures/AddLecture";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.5)",
    margin: "50px auto 50px auto",
    padding: "50px",
    borderRadius: "5px",
  },
  customText: {
    margin: "10px 30px 5px 30px",
    textAlign: "center",
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
  customGrid1: {
    width: "100%",
    marginTop: "15px",
  },
  customPagination: {
    color: "white",
  },
  selected: {
    backgroundColor: "rgba(255,255,255, 0.7) !important",
    color: "black",
  },
  snackbar: {
    backgroundColor: "#0276aa",
    color: "white",
  },
}));

const StyledButton = withStyles({
  root: {
    width: "50%",
    backgroundColor: "#f44336",
    color: "white",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "#aa2e25",
      color: "white",
    },
    "&:disabled": {
      backgroundColor: "rgb(155,155,155)",
      color: "rgb(200,200,200)",
    },
  },
})(Button);

const StyledButton2 = withStyles({
  root: {
    width: "50%",
    backgroundColor: "#8bc34a",
    color: "white",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "#79955a",
      color: "white",
    },
  },
})(Button);

const StyledButton3 = withStyles({
  root: {
    width: "50%",
    backgroundColor: "#7cb342",
    color: "white",
    fontSize: "1rem",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#6d8e46",
      color: "white",
    },
    "&:disabled": {
      backgroundColor: "rgb(155,155,155)",
      color: "rgb(200,200,200)",
    },
  },
})(Button);

function secondsToHms(d) {
  return new Date(d * 1000).toISOString().substr(11, 8);
}

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

const CourseLecture = (props) => {
  const classes = useStyles();
  const [course, setCourse] = useState({});
  const [lectures, setLectures] = useState([]);
  const [pageNumberL, setPageNumberL] = useState(1);
  const [currPage, setPage] = useState(1);
  const [currLecture, setCurrLecture] = useState(undefined);
  const [lectureForm, setLectureForm] = useState(false);
  const [Length, setLength] = useState(0);
  const [isSave, setSave] = useState(false);
  const [open, setOpen] = useState(true);
  const [lectureState, setLectureState] = useState([]);
  let myplayer = undefined;
  const [progText, setText] = useState("");

  const config = {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const checkEnrolled = async () => {
    if (localStorage.getItem("role") === "0") {
      const data = await axios.get(
        `http://localhost:8080/api/enrolledcourses/${localStorage.getItem(
          "iduser"
        )}/${props.match.params.id}`,
        config
      );
      if (data.data.success === false) {
        History.push("/error");
        return;
      }
    }
  };

  const getCourse = async () => {
    const data = await axios.get(
      `http://localhost:8080/api/courses/${props.match.params.id}`
    );
    if (localStorage.getItem("role") === "1")
      if (parseInt(localStorage.getItem("iduser")) !== data.data.teacher) {
        History.push("/error");
        return;
      }
    setCourse(data.data);
  };

  const getLectures = async () => {
    const data = await axios.get(
      `http://localhost:8080/api/courselectures/${props.match.params.id}?page=${currPage}`,
      config
    );
    const length = await axios.get(
      `http://localhost:8080/api/courselectures/${props.match.params.id}`,
      config
    );
    setPageNumberL(Math.ceil(length.data.length / 5));
    setLength(length.data.length);
    setLectures(data.data);
    if (data.data.length > 0) return data.data[0];
    else return undefined;
  };

  const changeHandleL = (event, value) => {
    setPage(value);
  };

  const LectureClose = () => {
    setLectureForm(false);
  };

  const handleComplete = async () => {
    const data = {
      isCompleted: course.isCompleted === 0 ? 1 : 0,
      lastupdate: currentDate(),
    };
    const returnData = await axios.put(
      `http://localhost:8080/api/courses/${course.idcourses}`,
      data,
      config
    );
    if (returnData.data.success === true) {
      let tmp = course;
      tmp.isCompleted = data.isCompleted;
      tmp.lastupdate = data.lastupdate;
      setCourse({ ...tmp });
    }
  };

  const handleOnleave = async () => {
    if (localStorage.getItem("role") === "0") {
      const { player } = myplayer.getState();
      const data = {
        time: player.currentTime,
      };
      if (player.currentTime === player.duration) data.isCompleted = 1;
      const returnData = await axios.put(
        `http://localhost:8080/api/lecturestate/${localStorage.getItem(
          "iduser"
        )}/${course.idcourses}/${currLecture.idlecture}`,
        data,
        config
      );
      if (returnData.data.success === true) {
        console.log(
          "Unmount successfully. Current lecture: " +
            currLecture.idlecture +
            ", time: " +
            player.currentTime
        );
        const index = lectureState.findIndex(
          (obj) => obj.idlecture === currLecture.idlecture
        );
        let tmp = lectureState;
        tmp[index].time = data.time;
        if (data.isCompleted) tmp[index].isCompleted = data.isCompleted;
        setLectureState([...tmp]);
        setSave(true);
        setText(
          `Your current progress of "${currLecture.title}" is ` +
            secondsToHms(data.time)
        );
      }
    }
  };

  const getLectureState = async () => {
    const returnData = await axios.get(
      `http://localhost:8080/api/lecturestate/${localStorage.getItem(
        "iduser"
      )}/${props.match.params.id}`,
      config
    );
    if (returnData.data.length > 0) setLectureState(returnData.data);
  };

  const getCurrLectureState = async (idlecture, title) => {
    const returnData = await axios.get(
      `http://localhost:8080/api/lecturestate/${localStorage.getItem(
        "iduser"
      )}/${props.match.params.id}/${idlecture}`,
      config
    );
    let time = 0;
    if (returnData.data.isExist === false) {
      const data = {
        idlecture: idlecture,
        iduser: parseInt(localStorage.getItem("iduser")),
        idcourses: props.match.params.id,
        time: 0,
        isCompleted: 0,
      };
      const tmp = await axios.post(
        `http://localhost:8080/api/lecturestate/`,
        data,
        config
      );
    } else {
      time = returnData.data.lecturestate.time;
    }
    setText(`Your current progress of "${title}" is ` + secondsToHms(time));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("iduser") === null) History.push("/");
      else {
        await checkEnrolled();
        await getCourse();
        const data = await getLectures();
        setCurrLecture(data);
        if (localStorage.getItem("role") === "0") {
          await getLectureState();
          if (data) await getCurrLectureState(data.idlecture, data.title);
        }
      }
    };
    fetchData();
    return () => {
      setCourse({});
      setLectures([]);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getLectures();
    };
    fetchData();
    return () => {};
  }, [currPage]);

  return (
    <div className={classes.root}>
      {localStorage.getItem("role") === "0" && progText !== "" ? (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          onClose={handleClose}
          ContentProps={{
            className: classes.snackbar,
          }}
          message={progText}
          TransitionComponent={Fade}
          transitionDuration={500}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      ) : (
        undefined
      )}
      <Grid container className={classes.customGrid1}>
        <Grid item xs={8}>
          {currLecture ? (
            <>
              <Typography variant="h6" className={classes.customText3}>
                {currLecture.title}
              </Typography>
              <div
                onClick={() => {
                  setSave(false);
                }}
              >
                <Player
                  ref={(tplayer) => {
                    myplayer = tplayer;
                  }}
                  key={currLecture.idlecture}
                >
                  <source src={"http://localhost:8080" + currLecture.video} />
                  <ControlBar autoHide>
                    <ReplayControl seconds={10} order={1.1} />
                    <ForwardControl seconds={30} order={1.2} />
                    <CurrentTimeDisplay order={4.1} />
                    <TimeDivider order={4.2} />
                    <PlaybackRateMenuButton
                      rates={[2, 1, 0.5, 0.1]}
                      order={7.1}
                    />
                    <VolumeMenuButton order={7.2} />
                  </ControlBar>
                </Player>
              </div>
              <Typography
                variant="body1"
                className={classes.customText2}
                key={Date()}
                dangerouslySetInnerHTML={{ __html: currLecture.description }}
              ></Typography>
            </>
          ) : (
            <>
              <Typography variant="h5">
                This course hasn't have any lecture yet. Please come back later
              </Typography>
            </>
          )}
        </Grid>
        <Grid
          container
          item
          xs={4}
          alignItems="flex-start"
          justify="center"
          spacing={2}
        >
          <Grid container item justify="center">
            <Grid container item xs={10} justify="center" alignItems="center">
              {lectures.length > 0
                ? lectures.map((obj, key) => (
                    <Grid item xs={12} key={key}>
                      <LectureCard
                        active={currLecture ? currLecture.idlecture : -1}
                        data={obj}
                        setCurrLecture={setCurrLecture}
                        getCurrentState={getCurrLectureState}
                        setOpen={setOpen}
                        isCompleted={() => {
                          if (localStorage.getItem("role") === "0") {
                            const tmp = lectureState.find(
                              (obj2) => obj2.idlecture === obj.idlecture
                            );
                            if (tmp) return tmp.isCompleted;
                            else return 0;
                          } else return 0;
                        }}
                      ></LectureCard>
                    </Grid>
                  ))
                : undefined}
              {lectures.length > 0 ? (
                <Box my={1} display="flex" justifyContent="center">
                  <Pagination
                    count={pageNumberL ? pageNumberL : 1}
                    defaultPage={1}
                    onChange={changeHandleL}
                    renderItem={(item) => (
                      <PaginationItem
                        {...item}
                        className={classes.customPagination}
                        classes={{ selected: classes.selected }}
                      />
                    )}
                  />
                </Box>
              ) : (
                undefined
              )}
            </Grid>
            <Grid container item xs={11} justify="center">
              <Grid item>
                <img
                  src={"http://localhost:8080" + course.img}
                  width="256px"
                ></img>
              </Grid>
              <Grid item>
                <Typography variant="h6" className={classes.customText}>
                  {course.name}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.customText}
                  style={{ marginBottom: "15px" }}
                >
                  Last update: {course.lastupdate}
                </Typography>
              </Grid>

              {localStorage.getItem("role") === "1" ? (
                <Grid container item xs={12} justify="center" spacing={1}>
                  <Grid container justify="center" item xs={12}>
                    <StyledButton
                      onClick={() => {
                        setLectureForm(true);
                      }}
                      disabled={course.isCompleted === 0 ? false : true}
                    >
                      Add lectures
                    </StyledButton>
                  </Grid>
                  <Grid container justify="center" item xs={12}>
                    {course.isCompleted === 0 ? (
                      <StyledButton2 onClick={handleComplete}>
                        Complete?
                      </StyledButton2>
                    ) : (
                      <StyledButton3 onClick={handleComplete}>
                        COMPLETED
                        <br />
                        (Click to set incomplete)
                      </StyledButton3>
                    )}
                  </Grid>
                </Grid>
              ) : localStorage.getItem("role") === "0" && currLecture ? (
                <StyledButton3
                  disabled={isSave ? true : false}
                  onClick={handleOnleave}
                >
                  {isSave ? "Saved" : "Save progress"}
                </StyledButton3>
              ) : (
                undefined
              )}
            </Grid>
          </Grid>
          <LectureForm
            lectureClose={LectureClose}
            open={lectureForm}
            setPage={setPageNumberL}
            lectures={lectures}
            setLectures={setLectures}
            match={props.match}
            length={Length}
          ></LectureForm>
        </Grid>
      </Grid>
    </div>
  );
};

export default CourseLecture;
