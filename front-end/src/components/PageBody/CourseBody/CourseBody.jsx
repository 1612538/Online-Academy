import React, {useEffect, useState} from 'react';
import {Grid, Typography, Button, Avatar, Link} from '@material-ui/core';
import Rating from "@material-ui/lab/Rating";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Infinite from '@material-ui/icons/AllInclusive';
import Phone from '@material-ui/icons/PhoneAndroid';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '75%',
        backgroundColor: 'rgba(255,255,255,0.5)',
        margin: '50px auto 0 auto',
        padding: '50px',
        borderRadius:'5px',
    },
    customGrid1: {
        width: '100%',
        marginTop:'15px'
    },
    customGrid2: {
        width: '80%',
    },
    customText: {
        fontWeight: 'bold',
        margin:'10px 30px 5px 30px',
    },
    customText2: {
        margin: '10px 20px 5px 20px',
    },
    customText3: {
        fontWeight: 'bold',
        borderBottom: '1px solid black',
        paddingBottom: '2px',
        marginBottom: '20px',
        marginLeft:'30px',
    },
    customBox: {
        border: '1px solid rgba(0,0,0,0.3)',
        margin: '20px auto 20px auto',
        width: '300px',
        padding: '20px',
    },
    rate:{
        color: '#3f51b5',
        fontWeight: 'bold',
      },
      price: {
        color: 'red',
        fontWeight: 'bold',
      },
  }));

  const StyledButton = withStyles({
    root: {
        width: '100%',
        backgroundColor:'#f44336',
        color: 'white',
        fontSize:'1rem',
      '&:hover': {
        backgroundColor: '#aa2e25',
        color: '#white',
    },
  }})(Button);

  const StyledButton2 = withStyles({
    root: {
        width: '100%',
        border: "2px solid #3d5afe",
        backgroundColor:'transparent',
        color: '#3d5afe',
        fontSize:'1rem',
      '&:hover': {
        border: "2px solid #1c54b2",
        backgroundColor:'transparent',
        color: '#1c54b2',
    },
  }})(Button);

const CourseBody = (props) => {
    const classes = useStyles();
    const [course, setCourse] = useState({});
    const [teacher, setTeacher] = useState({});

    const getCourse = async () => {
        const data = await axios.get(`http://localhost:8080/api/courses/${props.match.params.id}`)
        setCourse(data.data);
        return data.data.teacher;
    }

    const getTeacher = async (teacher) => {
        const data = await axios.get(`http://localhost:8080/api/users/${teacher}`)
        setTeacher(data.data);
        return '';
    }
    
    useEffect(async ()=>{
        const teacher = await getCourse();
        const tmp = await getTeacher(teacher);
        return () => {
            setCourse({});
            setTeacher({});
        }
    }, [])

    return (
        <div className={classes.root}>
        <Grid container direction='row' className={classes.customGrid1} spacing={0}>
            <Grid container item xs={8} spacing={2} alignItems='center'>
                <Grid item xs={12}>
                    <Typography variant='h4' className={classes.customText}>{course.name}</Typography>
                    <Typography variant='h6' className={classes.customText} style={{fontWeight: 'normal'}}>{course.description1}</Typography>
                </Grid>
            </Grid>
            <Grid container item xs={4} justify='center' alignItems='center'>
                <img style={{ height: '170px', width: '300px'}} alt={course.name} src={'http://localhost:8080'+course.img} />
            </Grid>
        </Grid>
        <Grid container className={classes.customGrid1} spacing={4}>
            <Grid item xs={8}>
                <Typography variant='h5' className={classes.customText3}>About courses</Typography>
                <div className={classes.customText2} dangerouslySetInnerHTML={{__html: course.description2}}></div>
            </Grid>
            <Grid item xs={4}>
                <Grid container className={classes.customBox} spacing={2}>
                    <Grid container item xs = {12} direction="row">
                        <Grid item xs={7}>
                        <Typography variant="h6" >Price: </Typography>
                        </Grid>
                        <Grid item xs={5}>
                        <Typography variant="h5" className={classes.price}>${course.price}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledButton>Enroll</StyledButton>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledButton2>Add to favorites</StyledButton2>
                    </Grid>
                    <Grid container item direction='row' xs={12}>
                        <Grid item xs={3}>Rating: </Grid>
                        <Grid item xs = {1}  className={classes.rate}>
                        {course.rate}
                        </Grid>
                        <Grid item xs = {4} style={{marginLeft: '7px', marginTop: '2px'}}>
                        <Rating size="small" name="read-only" precision={0.5} value={parseFloat(course.rate)} readOnly />
                        </Grid>
                        <Grid item xs = {2} style={{marginLeft: '7px'}}>
                        ({course.ratevotes})
                        </Grid>
                    </Grid>
                    <Grid item xs = {12}>
                    <Typography variant="body1" >This course includes: </Typography>
                    <Typography variant="body2" ><Infinite fontSize='small' style={{margin: '5px 10px -4px 0'}}></Infinite>Full lifetime access </Typography>
                    <Typography variant="body2" ><Phone fontSize='small' style={{margin: '5px 10px -4px 0'}}></Phone>Access on mobile and TV </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
            <Typography variant='h5' className={classes.customText3}>Instructors</Typography>
            <Grid container alignItems='center' direction='column'>
                <Grid item>
                <Link href={"/lecturer/" + teacher.iduser}>
                <Avatar style={{ height: '120px', width: '120px' }} alt={teacher.firstname + " " + teacher.lastname} src="https://img-c.udemycdn.com/user/200_H/2364054_83cd_5.jpg?Expires=1622293513&Signature=EhYBO91U-pTGRq~ctA1rJuZbXojsiWHuR7~M9C1JGbKHZULiGnAhdjl1Tbfy2tNTcOmU5wvnKMkiogumch-gMwCVTdB0EdUn~kyBljRsadM3K8hIzEWPbcPaBfLi4jLchUpefDvFEZ9EgU90pYkVmAeXy01EoYL6Ty33y3WwhZjw0iHSMRXUr0jtfIosQ7ZnBFnPk~YsoEuw3W4ILAZ31zZFX5V2uD7JEWXkb27tn6lwkZNu1zHJsfnwCAkQsqPIgDaW4MeMOOO3ySyAH2jQlYMRr9bb2BHYVFtZ~BEk3iyIltnDPv5nErjDVmlWa03y5dcKKXpQXKJoGP3S9lbdJQ__&Key-Pair-Id=APKAITJV77WS5ZT7262A" />
                </Link>
                </Grid>
                <Grid item>
                    <Typography variant="h6">{teacher.firstname + " " + teacher.lastname}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" style={{fontWeight: 'bold'}}>{teacher.occupation}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1"  className={classes.customText2}>{teacher.information}</Typography>
                </Grid>
            </Grid>
            </Grid>
            <Grid item xs={6}>
            <Typography variant='h5' className={classes.customText3}>Student feedback</Typography>
            </Grid>
        </Grid>
        </div>
    )
}

export default CourseBody;