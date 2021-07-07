import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Grid, Button, Box, Fade, Typography, Link } from "@material-ui/core";
import { Pagination, PaginationItem, Rating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import ChatBot from "react-simple-chatbot";
import "../../assets/chatbot.css";
import axios from "axios";
import History from "../History";

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
import "video-react/dist/video-react.css";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Roboto",
  headerBgColor: "#1e88e5",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#1e88e5",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const useStyles = makeStyles({
  customPagination: {
    color: "black",
  },
  selected: {
    backgroundColor: "rgba(0,0,0,0.1) !important",
    color: "black",
  },
  rate: {
    color: "rgba(255,180,180,1)",
  },
  price: {
    color: "red",
    fontSize: "1rem",
    fontWeight: "bold",
  },
});

const SmallCats = (props) => {
  const [categories, setCategories] = useState([]);
  const getSmallCategories = () => {
    axios
      .get(`http://localhost:8080/api/smallcategories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSmallCategories();
  }, []);

  const handleClick = (id) => {
    props.triggerNextStep({ value: id, trigger: "courselist" });
    setCategories([]);
  };

  return categories.length > 0 ? (
    <Grid container justify="flex-start" spacing={1} style={{ width: "100%" }}>
      {categories.map((obj, key) => (
        <Grid item xs={12} key={key}>
          <Button
            color="primary"
            variant="contained"
            style={{ textTransform: "none" }}
            onClick={() => {
              handleClick(obj.idsmall_category);
            }}
          >
            {obj.name}
          </Button>
        </Grid>
      ))}
    </Grid>
  ) : (
    <></>
  );
};

const CoursesByCat = (props) => {
  const [courses, setCourses] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [length, setLength] = useState(0);
  const [isDisabled, setDisabled] = useState(false);
  const { previousStep } = props;

  const getLength = async (catID) => {
    const result = await axios.get(
      `http://localhost:8080/api/coursesByCatID/${catID}`
    );
    if (result.data.length > 0) {
      let pageNumber = Math.ceil(result.data.length / 5);
      setLength(pageNumber);
    }
  };

  const getCourses = async (catID) => {
    const result = await axios.get(
      `http://localhost:8080/api/coursesByCatID/${catID}?page=${currPage}`
    );
    if (result.data.length > 0) {
      setCourses(result.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCourses(previousStep.value);
    };
    fetchData();
  }, [currPage]);

  useEffect(() => {
    const fetchData = async () => {
      await getLength(previousStep.value);
    };
    fetchData();
  }, []);

  const handleClick = (obj) => {
    props.triggerNextStep({
      value: {
        course: obj,
        courses: courses,
        currPage: currPage,
        command:
          "http://localhost:8080/api/coursesByCatID/" +
          previousStep.value +
          "?page=",
      },
      trigger: "courseDetail",
    });
    setCourses([]);
    setLength(0);
  };

  const handleTrigger = () => {
    props.triggerNextStep({ trigger: "continue" });
    setDisabled(true);
  };

  const changeHandle = (event, value) => {
    setCurrPage(value);
  };

  return (
    <GetCourses
      courses={courses}
      handleTrigger={handleTrigger}
      handleClick={handleClick}
      changeHandle={changeHandle}
      length={length}
      currPage={currPage}
      isDisabled={isDisabled}
    ></GetCourses>
  );
};

const CoursesByKeyword = (props) => {
  const [courses, setCourses] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [length, setLength] = useState(0);
  const [isDisabled, setDisabled] = useState(false);
  const { previousStep } = props;

  const getLength = async (keyword) => {
    const result = await axios.get(
      `http://localhost:8080/api/coursesearch?keyword=${keyword}`
    );
    if (result.data.length > 0) {
      let pageNumber = Math.ceil(result.data.length / 5);
      setLength(pageNumber);
    }
  };

  const getCourses = async (keyword) => {
    const result = await axios.get(
      `http://localhost:8080/api/coursesearch?keyword=${keyword}&page=${currPage}`
    );
    if (result.data.length > 0) {
      setCourses(result.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCourses(previousStep.value);
    };
    fetchData();
  }, [currPage]);

  useEffect(() => {
    const fetchData = async () => {
      await getLength(previousStep.value);
    };
    fetchData();
  }, []);

  const handleClick = (obj) => {
    props.triggerNextStep({
      value: {
        course: obj,
        courses: courses,
        currPage: currPage,
        command:
          "http://localhost:8080/api/coursesearch?keyword=" +
          previousStep.value +
          "&page=",
      },
      trigger: "courseDetail",
    });
    setCourses([]);
    setLength(0);
  };

  const handleTrigger = () => {
    props.triggerNextStep({ trigger: "continue" });
    setDisabled(true);
  };

  const changeHandle = (event, value) => {
    setCurrPage(value);
  };

  return (
    <GetCourses
      courses={courses}
      handleTrigger={handleTrigger}
      handleClick={handleClick}
      changeHandle={changeHandle}
      length={length}
      currPage={currPage}
      isDisabled={isDisabled}
    ></GetCourses>
  );
};

const GetCourses = ({
  courses,
  handleClick,
  handleTrigger,
  changeHandle,
  length,
  currPage,
  isDisabled,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Fade in={open}>
      <Typography component="div">
        <Grid container justify="center" spacing={1} style={{ width: "350px" }}>
          {courses.length > 0 ? (
            courses.map((obj, key) => (
              <Grid item xs={12} key={key}>
                <Button
                  color="primary"
                  variant="contained"
                  style={{
                    textTransform: "none",
                    width: "350px",
                    justifyContent: "flex-start",
                    height: "75px",
                    display: "flex",
                    flexFlow: "row wrap",
                  }}
                  onClick={() => {
                    handleClick(obj);
                    setOpen(false);
                  }}
                >
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="row"
                    style={{ width: "350px" }}
                  >
                    <Grid
                      container
                      alignItems="center"
                      item
                      style={{ width: "60px", marginRight: "10px" }}
                    >
                      <img
                        width="60px"
                        height="40px"
                        src={"http://localhost:8080" + obj.img}
                      ></img>
                    </Grid>
                    <Grid container item style={{ width: "240px" }}>
                      <Grid item>
                        <div
                          style={{
                            WebkitLineClamp: "2",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            width: "240px",
                            maxHeight: "3.2em",
                            lineHeight: "1.4em",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            textAlign: "left",
                          }}
                        >
                          {obj.name}
                        </div>
                      </Grid>
                      <Grid item style={{ width: "280px" }}>
                        <Grid container direction="row" alignItems="center">
                          <Grid item className={classes.rate}>
                            {obj.rate}
                          </Grid>
                          <Grid item style={{ margin: "5px 3px 0px 5px" }}>
                            <Rating
                              size="small"
                              name="read-only"
                              precision={0.5}
                              value={parseFloat(obj.rate)}
                              readOnly
                            />
                          </Grid>
                          <Grid item>({obj.ratevotes})</Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Button>
              </Grid>
            ))
          ) : (
            <div style={{ fontSize: "14px" }}>Courses not found</div>
          )}
        </Grid>
        {length > 0 ? (
          <Box my={1} display="flex" justifyContent="center">
            <Pagination
              count={length > 0 ? length : 1}
              defaultPage={1}
              page={currPage}
              onChange={changeHandle}
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
          <div></div>
        )}
        {open ? (
          <Button
            variant="contained"
            disabled={isDisabled}
            style={{
              textTransform: "none",
              backgroundColor: "#1e88e5",
              color: "white",
            }}
            onClick={handleTrigger}
          >
            Continue
          </Button>
        ) : (
          <div></div>
        )}
      </Typography>
    </Fade>
  );
};

const CourseDetail = (props) => {
  const [courses, setCourses] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [isDisabled, setDisabled] = useState(false);
  const [course, setCourse] = useState({});
  const { previousStep } = props;

  const getCourses = async () => {
    const result = await axios.get(previousStep.value.command + currPage);
    if (result.data.length > 0) {
      setCourses(result.data);
    }
  };

  const handleTrigger = () => {
    props.triggerNextStep({ trigger: "continue" });
    setDisabled(true);
  };

  useEffect(() => {
    setCurrPage(previousStep.value.currPage);
    setCourse(previousStep.value.course);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getCourses();
    };
    fetchData();
  }, [currPage]);

  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        style={{
          width: "400px",
          height: "500px",
          overflowY: "auto",
          cursor: "default",
        }}
      >
        <Grid
          item
          container
          style={{ width: "380px", height: "80px" }}
          alignItems="center"
        >
          <Grid
            item
            style={{ width: "100px", height: "80px" }}
            container
            alignItems="center"
          >
            <img
              width="100px"
              height="60px"
              src={"http://localhost:8080" + course.img}
            ></img>
          </Grid>
          <Grid
            item
            style={{
              width: "270px",
              height: "80px",
              marginLeft: "10px",
              fontWeight: "bold",
            }}
            container
            alignItems="center"
          >
            {course.name}
          </Grid>
        </Grid>
        <Grid item style={{ width: "380px", height: "max-content" }}>
          {course.description1}
        </Grid>
        <Grid item style={{ width: "280px", height: "35px", marginTop: "5px" }}>
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.rate} style={{ color: "red" }}>
              Rating: {course.rate}
            </Grid>
            <Grid item style={{ margin: "3px 3px 0px 5px" }}>
              <Rating
                size="small"
                name="read-only"
                precision={0.5}
                value={parseFloat(course.rate)}
                readOnly
              />
            </Grid>
            <Grid item>({course.ratevotes})</Grid>
          </Grid>
        </Grid>
        <Grid
          item
          style={{
            width: "100px",
            height: "35px",
            paddingTop: "3px",
            marginTop: "5px",
          }}
        >
          <div className={classes.price}>${course.price}</div>
        </Grid>
        <Grid item style={{ width: "380px", height: "35px" }}>
          Last update: {course.lastupdate}
        </Grid>
        <Link
          href={"/courses/" + course.idcourses}
          style={{ cursor: "pointer" }}
        >
          Go to course detail
        </Link>
        <Grid item style={{ width: "380px" }}>
          <h3 style={{ marginBlockStart: "0.5em", marginBlockEnd: "0.5em" }}>
            Preview video
          </h3>
          <Player
            key={course.idcourses}
            poster={"http://localhost:8080" + course.img}
          >
            <source src={"http://localhost:8080" + course.previewvideo} />
            <ControlBar autoHide>
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={30} order={1.2} />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <PlaybackRateMenuButton rates={[2, 1, 0.5, 0.1]} order={7.1} />
              <VolumeMenuButton order={7.2} />
            </ControlBar>
          </Player>
        </Grid>
        <Grid item style={{ width: "380px" }}>
          <h3>About courses</h3>
          <div dangerouslySetInnerHTML={{ __html: course.description2 }}></div>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        disabled={isDisabled}
        style={{
          textTransform: "none",
          backgroundColor: "#1e88e5",
          color: "white",
        }}
        onClick={handleTrigger}
      >
        Continue
      </Button>
    </div>
  );
};

const ChatBox = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        floating
        headerTitle="Online Academy - User support"
        bubbleStyle={{ width: "max-content" }}
        contentStyle={{ height: "calc(670px - 112px)" }}
        style={{ height: "670px", width: "450px" }}
        steps={[
          {
            id: "1",
            message: "Hello, how can I help you?",
            trigger: "searchOption",
          },
          {
            id: "searchOption",
            options: [
              { value: "search", label: "Search courses", trigger: "2" },
            ],
          },
          {
            id: "2",
            message: "What type of search you want?",
            trigger: "typeOption",
          },
          {
            id: "typeOption",
            options: [
              { value: "keyword", label: "By keyword", trigger: "3" },
              { value: "category", label: "By category", trigger: "4" },
            ],
          },
          {
            id: "3",
            message: "Ok, please type your keyword",
            trigger: "keyword",
          },
          {
            id: "4",
            message: "OK, please choose one from categories below",
            trigger: "category",
          },
          {
            id: "keyword",
            user: true,
            trigger: "handleSearch",
          },
          {
            id: "category",
            component: <SmallCats></SmallCats>,
            waitAction: true,
          },
          {
            id: "courselist",
            component: <CoursesByCat></CoursesByCat>,
            waitAction: true,
          },
          {
            id: "handleSearch",
            component: <CoursesByKeyword></CoursesByKeyword>,
            waitAction: true,
          },
          {
            id: "courseDetail",
            component: <CourseDetail></CourseDetail>,
            waitAction: true,
          },
          {
            id: "continue",
            message: "Do you want to search anything else?",
            trigger: "typeOption",
          },
        ]}
      />
    </ThemeProvider>
  );
};

export default ChatBox;
