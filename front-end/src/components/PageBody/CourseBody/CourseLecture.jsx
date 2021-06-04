import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "video-react/dist/video-react.css";

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
    width: "75%",
    backgroundColor: "rgba(255,255,255,0.5)",
    margin: "50px auto 50px auto",
    padding: "50px",
    borderRadius: "5px",
  },
  customText: {
    fontWeight: "bold",
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
}));

const StyledButton = withStyles({
  root: {
    width: "50%",
    backgroundColor: "#f44336",
    color: "white",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "#aa2e25",
      color: "#white",
    },
  },
})(Button);

const CourseLecture = (props) => {
  const classes = useStyles();
  const [course, setCourse] = useState({});
  const [lectures, setLectures] = useState([]);
  const [pageNumberL, setPageNumberL] = useState(1);
  const [currPage, setPage] = useState(1);
  const [currLecture, setCurrLecture] = useState(undefined);
  const [lectureForm, setLectureForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const [Length, setLength] = useState(0);

  const config = {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
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
    return data.data[0];
  };

  const changeHandleL = (event, value) => {
    setPage(value);
  };

  const LectureClose = () => {
    setLectureForm(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("iduser") === null) History.push("/");
      else {
        await checkEnrolled();
        await getCourse();
        const data = await getLectures();
        setCurrLecture(data);
      }
    };
    fetchData();
    return () => {
      setCourse({});
      setLectures([]);
    };
  }, [update]);

  useEffect(() => {
    const fetchData = async () => {
      await getLectures();
    };
    fetchData();
    return () => {
      setLectures([]);
    };
  }, [currPage]);

  return (
    <div className={classes.root}>
      <Grid container className={classes.customGrid1}>
        <Grid item xs={8}>
          {currLecture ? (
            <>
              <Typography variant="h6" className={classes.customText3}>
                {currLecture.title}
              </Typography>
              <Player>
                <source
                  key={currLecture.idlecture}
                  src={"http://localhost:8080" + currLecture.video}
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
              <Typography variant="body1" className={classes.customText2}>
                {currLecture.description}
              </Typography>
            </>
          ) : undefined}
        </Grid>
        <Grid
          container
          item
          xs={4}
          direction="column"
          alignItems="center"
          spacing={2}
        >
          <Grid
            container
            item
            xs={10}
            justify="center"
            alignItems="center"
            style={{ height: "300px" }}
          >
            {lectures.map((obj, key) => {
              <Grid item xs={10} key={key}>
                <LectureCard data={obj}></LectureCard>
              </Grid>;
            })}
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
          </Grid>
          <Grid container item xs={11} justify="center">
            <img src={"http://localhost:8080" + course.img} width="256px"></img>
            <Typography variant="h6" className={classes.customText}>
              {course.name}
            </Typography>
            {localStorage.getItem("role") === "1" ? (
              <StyledButton
                onClick={() => {
                  setLectureForm(true);
                }}
              >
                Add lectures
              </StyledButton>
            ) : undefined}
          </Grid>
          <LectureForm
            lectureClose={LectureClose}
            open={lectureForm}
            update={update}
            setUpdate={setUpdate}
            match={props.match}
            length={Length}
          ></LectureForm>
        </Grid>
      </Grid>
    </div>
  );
};

export default CourseLecture;
