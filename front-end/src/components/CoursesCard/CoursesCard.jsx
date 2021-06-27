import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Link,
} from "@material-ui/core";
import { indigo, blue } from "@material-ui/core/colors";
import Rating from "@material-ui/lab/Rating";

import axios from "axios";

const useStyles = makeStyles({
  root: {
    backgroundColor: blue[50],
    width: 300,
  },
  media: {
    height: 160,
    borderBottom: "1px solid #e0e0e0",
    position: "relative",
  },
  custom: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    overflow: "hidden",
    lineHeight: 1.5,
  },
  colorButton: {
    backgroundColor: "#3f51b5",
    color: "white",
    "&:hover": {
      backgroundColor: indigo[800],
    },
    textTransform: "none",
    padding: "2px 8px 2px 8px",
  },
  rate: {
    color: "#3f51b5",
    fontWeight: "bold",
  },
  price: {
    color: "red",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  bestseller: {
    padding: "4px 10px 4px 10px",
    backgroundColor: "#ffc107",
    color: "#f50057",
    boxShadow: "0 3px 4px 0px rgba(0,0,0,0.5)",
    borderTopLeftRadius: "3px",
    borderBottomLeftRadius: "3px",
    fontWeight: "bold",
    fontSize: "0.8rem",
  },
  newest: {
    padding: "4px 10px 4px 10px",
    backgroundColor: blue[500],
    color: "white",
    boxShadow: "0 3px 4px 0px rgba(0,0,0,0.5)",
    borderTopLeftRadius: "3px",
    borderBottomLeftRadius: "3px",
    fontWeight: "bold",
    fontSize: "0.8rem",
    width: "max-content",
    float: "right",
  },
});

export default function CourseCard(props) {
  const course = props.course;
  const [teacherName, setTeacherName] = React.useState("");
  const [categoryName, setCategoryName] = React.useState("");
  const [bestseller, setBestSeller] = React.useState(false);
  const [newest, setNewest] = React.useState(false);

  const getTeacherById = (id) => {
    axios
      .get(`http://localhost:8080/api/users/${id}`)
      .then((res) => {
        const data = res.data.firstname + " " + res.data.lastname;
        setTeacherName(data);
      })
      .catch((err) => console.log(err));
  };

  const getCategoryById = (id) => {
    axios
      .get(`http://localhost:8080/api/smallcategories/${id}`)
      .then((res) => {
        const data = res.data.name;
        setCategoryName(data);
      })
      .catch((err) => console.log(err));
  };

  const getBestSeller = () => {
    axios.get(`http://localhost:8080/api/coursesbysubscribe`).then((res) => {
      const data = res.data;
      if (data.find((object) => object.idcourses === course.idcourses))
        setBestSeller(true);
    });
  };

  const getNewest = () => {
    axios.get(`http://localhost:8080/api/coursesbydate`).then((res) => {
      const data = res.data;
      if (data.find((object) => object.idcourses === course.idcourses))
        setNewest(true);
    });
  };

  useEffect(() => {
    const fetchData = () => {
      getTeacherById(course.teacher);
      getCategoryById(course.idsmall_category);
      getBestSeller();
      getNewest();
    };
    fetchData();
    return () => {
      setTeacherName("");
      setCategoryName("");
    };
  }, [props.course]);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link
          color="inherit"
          underline="none"
          href={`http://localhost:3000/courses/${course.idcourses}`}
        >
          <CardMedia
            className={classes.media}
            image={"http://localhost:8080" + course.img}
            title={course.name}
          >
            <div style={{ position: "absolute", right: "0", bottom: "10px" }}>
              {bestseller ? (
                <div className={classes.bestseller}>Bestseller</div>
              ) : (
                undefined
              )}
              {newest ? <div className={classes.newest}>New</div> : undefined}
            </div>
          </CardMedia>
        </Link>
        <CardContent>
          <Link
            color="inherit"
            underline="none"
            href={`http://localhost:3000/courses/${course.idcourses}`}
          >
            <Typography
              gutterBottom
              variant="subtitle1"
              component="h2"
              className={classes.custom}
            >
              {course.name}
            </Typography>
          </Link>
          <Grid
            container
            style={{ width: "100%", padding: 0 }}
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={4}>
              <Button
                href={`/categories/${course.idsmall_category}`}
                className={classes.colorButton}
              >
                {categoryName}
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" color="textSecondary" component="p">
                {teacherName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={1} className={classes.rate}>
                  {course.rate}
                </Grid>
                <Grid item xs={4}>
                  <Rating
                    size="small"
                    name="read-only"
                    precision={0.5}
                    value={parseFloat(course.rate)}
                    readOnly
                  />
                </Grid>
                <Grid item xs={3} style={{ marginLeft: "7px" }}>
                  ({course.ratevotes})
                </Grid>
                <Grid item xs={3} className={classes.price}>
                  ${course.price}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
