import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {indigo} from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import Rating from "@material-ui/lab/Rating";

import axios from 'axios';

const useStyles = makeStyles({
  custom: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    overflow: "hidden",
    lineHeight: 1.5
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

export default function CoursesCard() {
  const [course, setCourse] = React.useState({});
  const [teacherName, setTeacherName] = React.useState('');
  const [categoryName, setCategoryName] = React.useState('');

  const getCourse = () => {
      axios.get("http://localhost:8080/api/courses/3")
      .then(res => {
        const data = res.data;
        setCourse(data);
      })
      .catch(err => console.log(err));
  }

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
      getCourse();
      getTeacherById(course.teacher);
      getCategoryById(course.idsmall_category);
  })
  const classes = useStyles();
  return (
    <div></div>
  );
}