import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Grid, Button, Box } from "@material-ui/core";
import { Pagination, PaginationItem, Rating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import ChatBot from "react-simple-chatbot";
import "../../assets/chatbot.css";
import axios from "axios";
import History from "../History";

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
    const { previousStep } = props;
    const fetchData = async () => {
      await getCourses(previousStep.value);
    };
    fetchData();
  }, [currPage]);

  useEffect(() => {
    const { previousStep } = props;
    const fetchData = async () => {
      await getLength(previousStep.value);
    };
    fetchData();
  }, []);

  const handleClick = (id) => {
    History.push("/courses/" + id);
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
    const { previousStep } = props;
    const fetchData = async () => {
      await getCourses(previousStep.value);
    };
    fetchData();
  }, [currPage]);

  useEffect(() => {
    const { previousStep } = props;
    const fetchData = async () => {
      await getLength(previousStep.value);
    };
    fetchData();
  }, []);

  const handleClick = (id) => {
    History.push("/courses/" + id);
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
  useEffect(() => {}, []);

  return (
    <div>
      <Grid container justify="center" spacing={1} style={{ width: "350px" }}>
        {courses.length > 0
          ? courses.map((obj, key) => (
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
                    handleClick(obj.idcourses);
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
          : undefined}
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
        <></>
      )}
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
        style={{ height: "670px", width: "400px" }}
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
