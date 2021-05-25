import React, { useEffect } from "react";
import CoursesCard2 from '../CoursesCard/CoursesCard2';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
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
    },
    customGrid: {
        border: '1px solid white',
        borderTop: 0,
        borderBottomLeftRadius: '6px',
        borderBottomRightRadius: '6px',
        width: 1000,
        margin: 'auto',
        padding: 20,
        height: 940,
    },
    customPagination: {
        color: 'white',
    },
    selected: {
        backgroundColor: 'rgba(255,255,255, 0.7) !important',
        color:'black',
    },
  });

function AllCourses(props) {
    const classes = useStyles();
    let pageNumber = Math.ceil((props.dataLength)/5);
    const changeHandle = (event, value) =>{
        props.setCurrPage(value);
    }

    return (
        <div className={classes.root}>
        <Typography variant='h4' className={classes.customText}>All courses</Typography>
        <Grid container direction='column' spacing={3} className={classes.customGrid}>
            {
                props.courses.map((course, key) =><Fade in={true} timeout={1000} key={key}><Grid item>
                    <CoursesCard2 course={course}></CoursesCard2>
                    </Grid></Fade>)
            }
        </Grid>
        <Box my={1} display="flex" justifyContent="center">
        <Pagination count={pageNumber} defaultPage={pageNumber/2+1} onChange={changeHandle} size="large" 
        renderItem={(item)=> <PaginationItem {...item} 
        className={classes.customPagination} classes={{selected: classes.selected}}/>}/>
        </Box>
        </div>
    );
}

export default AllCourses;