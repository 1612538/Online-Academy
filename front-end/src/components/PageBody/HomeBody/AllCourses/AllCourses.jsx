import React, { useEffect } from "react";
import CoursesCard2 from '../../../CoursesCard/CoursesCard2';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        marginTop: '30px',
        padding: 20,
    },
    customText: {
        width: '90%',
        margin: 'auto',
        fontWeight: 'bold',
        color: 'white',
        borderBottom: '1px solid white',
        paddingBottom: '2px',
        marginBottom:'30px',
    },
    customGrid: {
        border: '2px solid white',
        borderRadius: '8px',
        width: 1000,
        margin: 'auto',
        padding: 20,
    }
  });

function AllCourses() {
    const classes = useStyles();
    const [courses, setCourses] = React.useState([]);
    const [showNext, setShowNext] = React.useState(true);
    const [showPrevious, setShowPrevious] = React.useState(false);
    const [currPage, setCurrPage] = React.useState(1);

    const getCourses = (current) => {
        axios.get(`http://localhost:8080/api/coursespage/${current}`)
        .then(res => {
            const data = res.data;
            setCourses(data);
        })
        .catch(err => console.log(err));
    }
    
    useEffect(()=>{
        getCourses(1);
    })

    return (
        <div className={classes.root}>
        <Typography variant='h4' className={classes.customText}>All courses</Typography>
        <Grid container justify='center' direction='column' spacing={3} className={classes.customGrid}>
            {
                courses.map((course, key) =><Fade in={true} timeout={1000} key={key}><Grid item>
                    <CoursesCard2 course={course}></CoursesCard2>
                    </Grid></Fade>)
            }
        </Grid>
        </div>
    );
}

export default AllCourses;