import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import CoursesCard from "../../CoursesCard/CoursesCard";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    marginTop: "50px",
  },
  customText: {
    width: "95%",
    margin: "auto",
    fontWeight: "bold",
    borderBottom: "1px solid black",
    paddingBottom: "2px",
    marginBottom: "10px",
  },
});

const CourseSubscribe = (props) => {
  const classes = useStyles();
  const [courses, setCourses] = React.useState([]);
  const [catName, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const getCourses = () => {
    axios
      .get(`http://localhost:8080/api/coursesbysubscribeandcat/${props.catID}`)
      .then((res) => {
        const data = res.data;
        setCourses(data);
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const getCategory = () => {
    axios
      .get(`http://localhost:8080/api/smallcategories/${props.catID}`)
      .then((res) => {
        const data = res.data;
        setName(data.name);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCourses();
    getCategory();
    return () => {
      setCourses([]);
    };
  }, [props.catID]);

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.customText}>
        Bestseller "{catName}" courses
      </Typography>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ padding: 20, width: "100%" }}
      >
        <Grid item xs={12}>
          <Fade in={open} timeout={1000}>
            <Grid
              container
              spacing={2}
              style={{
                display: "block",
                width: "95%",
                margin: "auto",
                height: "320px",
                overflow: "auto",
                whiteSpace: "nowrap",
              }}
            >
              {courses.map((course, key) => (
                <Grid
                  item
                  key={key}
                  style={{
                    display: "inline-block",
                  }}
                >
                  <CoursesCard course={course}></CoursesCard>
                </Grid>
              ))}
            </Grid>
          </Fade>
        </Grid>
      </Grid>
    </div>
  );
};

export default CourseSubscribe;
