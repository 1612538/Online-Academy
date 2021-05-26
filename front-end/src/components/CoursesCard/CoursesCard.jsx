import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActionArea, CardContent, CardMedia, Typography, Button, Grid, Link} from '@material-ui/core';
import {indigo, blue} from '@material-ui/core/colors';
import Rating from "@material-ui/lab/Rating";

import axios from 'axios';

const useStyles = makeStyles({
  root: {
    backgroundColor: blue[50],
    width: 300,
  },
  media: {
    height: 160,
    borderBottom: '1px solid #e0e0e0',
  },
  custom: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    overflow: "hidden",
    lineHeight: 1.5,
  },
  colorButton: {
    backgroundColor: '#3f51b5',
    color: 'white',
    '&:hover': {
      backgroundColor: indigo[800],
    },
    textTransform: 'none',
    padding: '2px 8px 2px 8px'
  },
  rate:{
    color: '#3f51b5',
    fontWeight: 'bold',
  },
  price: {
    color: 'red',
    fontSize: '1rem',
    fontWeight: 'bold',
  }
});

export default (props) => {
  const course = props.course;
  const [teacherName, setTeacherName] = React.useState('');
  const [categoryName, setCategoryName] = React.useState('');

  const getTeacherById = (id) =>{
    axios.get(`http://localhost:8080/api/teachers/${id}`)
      .then(res => {
        const data = res.data.firstname + " " + res.data.lastname;
        setTeacherName(data);
      })
      .catch(err => console.log(err));
  }
  
  const getCategoryById = (id) =>{
    axios.get(`http://localhost:8080/api/smallcategories/${id}`)
      .then(res => {
        const data = res.data.name;
        setCategoryName(data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
      getTeacherById(course.teacher);
      getCategoryById(course.idsmall_category);
      return () => {
        setTeacherName('');
        setCategoryName('');
      }
  }, [])
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link color='inherit' underline='none' href={`http://localhost:8080/api/courses/${course.idcourses}`}>
        <CardMedia
          className={classes.media}
          image={'http://localhost:8080'+course.img}
          title={course.name}
        />
        </Link>
        <CardContent>
          <Link color='inherit' underline='none' href={`http://localhost:8080/api/courses/${course.idcourses}`}>
          <Typography gutterBottom variant="subtitle1" component="h2" className={classes.custom}>
            {course.name}
          </Typography>
          </Link>
            <Grid container style={{width: '100%', padding: 0}} alignItems='center'  spacing={1}>
            <Grid item xs={4}>
              <Button href={`/categories/${course.idsmall_category}`} className={classes.colorButton}>{categoryName}</Button>
            </Grid>
            <Grid item xs={8}>
            <Typography variant="body2" color="textSecondary" component="p">
              {teacherName}
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Grid container direction='row' alignItems='center'>
            <Grid item xs = {1}  className={classes.rate}>
              {course.rate}
            </Grid>
            <Grid item xs = {4}>
            <Rating size="small" name="read-only" precision={0.5} value={parseFloat(course.rate)} readOnly />
            </Grid>
            <Grid item xs = {3} style={{marginLeft:'7px'}}>
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