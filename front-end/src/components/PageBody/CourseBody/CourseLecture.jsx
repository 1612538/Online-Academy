import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Snackbar,
  IconButton,
  Fade,
  TextField,
} from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "video-react/dist/video-react.css";
import { useBeforeunload } from "react-beforeunload";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
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

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

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
  customImageButton: {
    backgroundColor: "#4287f5",
    border: "1px solid #263de0",
    boxShadow: "none",
    padding: "5px 0px",
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
    borderRadius: "5px",
    marginLeft: "10px",
    marginBottom: "2px",
    color: "white",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#4251f5",
    },
  },
  customButton: {
    backgroundColor: "#4287f5",
    border: "1px solid #263de0",
    boxShadow: "none",
    borderRadius: "5px",
    margin: "10px",
    color: "white",
    padding: "5px 8px",
    textTransform: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#4251f5",
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
  const [previousVideo, setPVideo] = useState("");

  const [video, setVideo] = useState(null);
  const [isChange, setChange] = useState(false);

  const [update, setUpdate] = useState(false);
  const [canClick, setCanClick] = useState(true);
  const [isChange1, setChange1] = useState(false);
  const [isChange2, setChange2] = useState(false);
  const firstUpdate = useRef(true);

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

  const handleVideo = (e) => {
    if (e.target.files[0]) {
      let tmp = currLecture;
      tmp.video = window.URL.createObjectURL(e.target.files[0]);
      console.log(tmp.video);
      setCurrLecture({ ...tmp });
      setVideo(e.target.files[0]);
      setChange(true);
      setCanClick(false);
    }
  };

  const handleDataChange = async () => {
    let formData = new FormData();
    if (video !== null) formData.append("videoInput", video);
    const returnData = await axios.put(
      `http://localhost:8080/api/courselectures/${currLecture.idcourse}/${currLecture.idlecture}`,
      formData,
      config
    );
    if (returnData.data.success === true) {
      let tmp = currLecture;
      if (returnData.data.video !== "") {
        setPVideo(returnData.data.video);
        tmp.video = returnData.data.video;
      }
      setCurrLecture({ ...tmp });
      let index = lectures.findIndex(
        (obj) =>
          obj.idlecture === tmp.idlecture && obj.idcourse === tmp.idcourse
      );
      if (index >= 0) {
        let tmp2 = lectures;
        tmp2[index].video = tmp.video;
        setLectures([...tmp2]);
      }
      const data2 = {
        lastupdate: currentDate(),
      };
      const returnData2 = await axios.put(
        `http://localhost:8080/api/courses/${course.idcourses}`,
        data2,
        config
      );
      if (returnData2.data.success === true) {
        let temp = course;
        temp.lastupdate = data2.lastupdate;
        setCourse({ ...temp });
      }
      setVideo(null);
      setChange(false);
      setCanClick(true);
    }
  };

  const cancelChange = () => {
    let tmp = currLecture;
    tmp.video = previousVideo;
    setVideo(null);
    setCurrLecture({ ...tmp });
    let index = lectures.findIndex(
      (obj) => obj.idlecture === tmp.idlecture && obj.idcourse === tmp.idcourse
    );
    if (index >= 0) {
      let tmp2 = lectures;
      tmp2[index].video = tmp.video;
      setLectures([...tmp2]);
    }
    setChange(false);
    setCanClick(true);
  };

  const [titleText, setTitleText] = useState("");

  const handleUpdate1 = async () => {
    if (titleText !== currLecture.title) {
      const data = {
        title: titleText,
      };
      const returnData = await axios.put(
        `http://localhost:8080/api/courselectures/${currLecture.idcourse}/${currLecture.idlecture}`,
        data,
        config
      );
      if (returnData.data.success === true) {
        let tmp = currLecture;
        tmp.title = titleText;
        setCurrLecture({ ...tmp });
        let index = lectures.findIndex(
          (obj) =>
            obj.idlecture === tmp.idlecture && obj.idcourse === tmp.idcourse
        );
        if (index >= 0) {
          let tmp2 = lectures;
          tmp2[index].title = tmp.title;
          setLectures([...tmp2]);
        }
        const data2 = {
          lastupdate: currentDate(),
        };
        const returnData2 = await axios.put(
          `http://localhost:8080/api/courses/${course.idcourses}`,
          data2,
          config
        );
        if (returnData2.data.success === true) {
          let temp = course;
          temp.lastupdate = data2.lastupdate;
          setCourse({ ...temp });
        }
      }
    }
    setChange1(false);
  };

  const cancelUpdate1 = () => {
    setChange1(false);
  };

  const handleUpdate2 = async () => {
    const hashtagConfig = {
      trigger: "#",
      separator: " ",
    };
    const rawContentState = convertToRaw(editor.getCurrentContent());
    const markup = draftToHtml(rawContentState, hashtagConfig, true);
    const data = {
      description: markup,
    };
    const returnData = await axios.put(
      `http://localhost:8080/api/courselectures/${currLecture.idcourse}/${currLecture.idlecture}`,
      data,
      config
    );
    if (returnData.data.success === true) {
      let tmp = currLecture;
      tmp.description = markup;
      setCurrLecture({ ...tmp });
      let index = lectures.findIndex(
        (obj) =>
          obj.idlecture === tmp.idlecture && obj.idcourse === tmp.idcourse
      );
      if (index >= 0) {
        let tmp2 = lectures;
        tmp2[index].description = tmp.description;
        setLectures([...tmp2]);
      }
      const data2 = {
        lastupdate: currentDate(),
      };
      const returnData2 = await axios.put(
        `http://localhost:8080/api/courses/${course.idcourses}`,
        data2,
        config
      );
      if (returnData2.data.success === true) {
        let temp = course;
        temp.lastupdate = data2.lastupdate;
        setCourse({ ...temp });
      }
    }
    setChange2(false);
  };

  const cancelUpdate2 = () => {
    setChange2(false);
  };

  const [editor, setEditor] = useState("");

  const onEditorStateChange = (contentState) => {
    setEditor(contentState);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("iduser") === null) History.push("/");
      else {
        await checkEnrolled();
        await getCourse();
        const data = await getLectures();
        if (data) {
          setCurrLecture(data);
          setPVideo(data.video);
        }
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLectures();
      if (data) {
        setCurrLecture(data);
        setPVideo(data.video);
      } else {
        setCurrLecture(undefined);
        setPVideo(undefined);
      }
    };
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchData();
  }, [update]);

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
                {isChange1 === false ? (
                  currLecture.title
                ) : (
                  <TextField
                    variant="outlined"
                    defaultValue={currLecture.title}
                    label="Title"
                    style={{ width: "500px" }}
                    onChange={(e) => {
                      setTitleText(e.target.value);
                    }}
                  ></TextField>
                )}
                {localStorage.getItem("role") === "1" ? (
                  isChange1 === false ? (
                    <Button
                      variant="contained"
                      component="label"
                      style={{
                        maxWidth: "35px",
                        maxHeight: "35px",
                        minWidth: "35px",
                        minHeight: "35px",
                      }}
                      className={classes.customImageButton}
                      onClick={() => {
                        setTitleText(currLecture.title);
                        setChange1(true);
                      }}
                    >
                      <EditIcon></EditIcon>
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        className={classes.customImageButton}
                        style={{
                          maxWidth: "35px",
                          maxHeight: "35px",
                          minWidth: "35px",
                          minHeight: "35px",
                          marginTop: "9px",
                        }}
                        onClick={() => {
                          handleUpdate1();
                        }}
                      >
                        <CheckIcon></CheckIcon>
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{
                          maxWidth: "35px",
                          maxHeight: "35px",
                          minWidth: "35px",
                          minHeight: "35px",
                          border: "1px solid #ab1d1d",
                          boxShadow: "none",
                          borderRadius: "5px",
                          margin: "9px 0px 2px 10px",
                          color: "white",
                          padding: "5px 8px",
                          textTransform: "none",
                        }}
                        onClick={() => {
                          cancelUpdate1();
                        }}
                      >
                        <ClearIcon></ClearIcon>
                      </Button>
                    </>
                  )
                ) : (
                  undefined
                )}
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
                  key={currLecture.video}
                >
                  <source
                    src={
                      isChange && video
                        ? currLecture.video
                        : "http://localhost:8080" + currLecture.video
                    }
                  />
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
              {localStorage.getItem("role") === "1" ? (
                <Button
                  color="primary"
                  variant="contained"
                  component="label"
                  className={classes.customButton}
                >
                  Click to change video
                  <input
                    type="file"
                    hidden
                    accept="video/*"
                    onChange={(e) => {
                      handleVideo(e);
                    }}
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                  />
                </Button>
              ) : (
                undefined
              )}
              <Typography variant="h6" className={classes.customText3}>
                Lecture description
                {localStorage.getItem("role") === "1" ? (
                  isChange2 === false ? (
                    <Button
                      variant="contained"
                      component="label"
                      style={{
                        maxWidth: "35px",
                        maxHeight: "35px",
                        minWidth: "35px",
                        minHeight: "35px",
                      }}
                      className={classes.customImageButton}
                      onClick={() => {
                        setTitleText(currLecture.title);
                        setChange2(true);
                      }}
                    >
                      <EditIcon></EditIcon>
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        className={classes.customImageButton}
                        style={{
                          maxWidth: "35px",
                          maxHeight: "35px",
                          minWidth: "35px",
                          minHeight: "35px",
                          marginTop: "9px",
                        }}
                        onClick={() => {
                          handleUpdate2();
                        }}
                      >
                        <CheckIcon></CheckIcon>
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{
                          maxWidth: "35px",
                          maxHeight: "35px",
                          minWidth: "35px",
                          minHeight: "35px",
                          border: "1px solid #ab1d1d",
                          boxShadow: "none",
                          borderRadius: "5px",
                          margin: "9px 0px 2px 10px",
                          color: "white",
                          padding: "5px 8px",
                          textTransform: "none",
                        }}
                        onClick={() => {
                          cancelUpdate2();
                        }}
                      >
                        <ClearIcon></ClearIcon>
                      </Button>
                    </>
                  )
                ) : (
                  undefined
                )}
              </Typography>
              {isChange2 ? (
                <div
                  style={{
                    backgroundColor: "white",
                    margin: "10px",
                    padding: "10px",
                  }}
                >
                  <Editor
                    editorState={editor}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                    editorStyle={{ height: "200px" }}
                    handlePastedText={() => false}
                  />
                </div>
              ) : (
                <Typography
                  variant="body1"
                  className={classes.customText2}
                  key={Date()}
                  dangerouslySetInnerHTML={{ __html: currLecture.description }}
                ></Typography>
              )}
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
            <Grid
              container
              item
              xs={10}
              justify="center"
              alignItems="flex-start"
              style={{ height: "405px" }}
            >
              <Grid container item justify="center" alignItems="flex-start">
                {lectures.length > 0
                  ? lectures.map((obj, key) => (
                      <Grid item xs={12} key={key}>
                        <LectureCard
                          active={currLecture ? currLecture.idlecture : -1}
                          data={obj}
                          config={config}
                          setCurrLecture={setCurrLecture}
                          getCurrentState={getCurrLectureState}
                          setOpen={setOpen}
                          setUpdate={setUpdate}
                          update={update}
                          setPVideo={setPVideo}
                          canClick={canClick}
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
              </Grid>
            </Grid>
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
                      disabled={
                        course.isCompleted === 0
                          ? isChange === false
                            ? false
                            : true
                          : true
                      }
                    >
                      Add lectures
                    </StyledButton>
                  </Grid>
                  <Grid container justify="center" item xs={12}>
                    {course.isCompleted === 0 ? (
                      <StyledButton2
                        disabled={isChange === false ? false : true}
                        onClick={handleComplete}
                      >
                        Complete?
                      </StyledButton2>
                    ) : (
                      <StyledButton3
                        disabled={isChange === false ? false : true}
                        onClick={handleComplete}
                      >
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
            setLength={setLength}
          ></LectureForm>
        </Grid>
      </Grid>
      <Snackbar
        open={isChange}
        action={
          <React.Fragment>
            Your video changes haven't been saved.
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

export default CourseLecture;
