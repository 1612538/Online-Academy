import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { indigo, blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Rating from "@material-ui/lab/Rating";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: blue[50],
    padding: 10,
    margin: "auto",
    maxWidth: 900,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  custom: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 1,
    overflow: "hidden",
    lineHeight: 1.5,
    marginBottom: 2,
    width: "90%",
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
    fontWeight: "bold",
  },
  bestseller: {
    padding: "4px 10px 4px 10px",
    backgroundColor: "#ffc107",
    color: "#f50057",
    position: "absolute",
    left: "0",
    top: "10px",
    boxShadow: "0 3px 4px 0px rgba(0,0,0,0.5)",
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
    fontWeight: "bold",
    fontSize: "0.8rem",
  },
}));

export default (props) => {
  const [course, setCourse] = React.useState(props.course);
  const [teacherName, setTeacherName] = React.useState("");
  const [categoryName, setCategoryName] = React.useState("");
  const [bestseller, setBestSeller] = React.useState(false);

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

  useEffect(() => {
    const fetchData = () => {
      getTeacherById(course.teacher);
      getCategoryById(course.idsmall_category);
      getBestSeller();
    };
    fetchData();
    return () => {
      setCategoryName("");
      setTeacherName("");
    };
  }, [props.course]);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item>
            <ButtonBase
              className={classes.image}
              href={`http://localhost:3000/courses/${course.idcourses}`}
            >
              <img
                className={classes.img}
                alt="complex"
                src={"http://localhost:8080" + course.img}
              />
              {bestseller ? (
                <div className={classes.bestseller}>Bestseller</div>
              ) : undefined}
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={0}>
              <Grid item xs>
                <Link
                  color="inherit"
                  underline="none"
                  href={`http://localhost:3000/courses/${course.idcourses}`}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    className={classes.custom}
                  >
                    {course.name}
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs>
                <Link
                  color="inherit"
                  underline="none"
                  href={`http://localhost:3000/courses/${course.idcourses}`}
                >
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    className={classes.custom}
                  >
                    {course.description1}
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs>
                <Grid
                  container
                  style={{ width: "50%", padding: 0 }}
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs={6}>
                    <Button
                      href={`/categories/${course.idsmall_category}`}
                      className={classes.colorButton}
                    >
                      {categoryName}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {teacherName}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{ marginTop: "-5px", paddingBottom: "0px" }}
                  >
                    <Grid container direction="row" alignItems="center">
                      <Grid item xs={1} className={classes.rate}>
                        {course.rate}
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{ marginTop: "5px", marginLeft: "5px" }}
                      >
                        <Rating
                          size="small"
                          name="read-only"
                          precision={0.5}
                          value={parseFloat(course.rate)}
                          readOnly
                        />
                      </Grid>
                      <Grid item xs={6}>
                        ({course.ratevotes})
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h6" className={classes.price}>
                ${course.price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
