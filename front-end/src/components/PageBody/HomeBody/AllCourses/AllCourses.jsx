import React, { useEffect } from "react";
import CoursesCard2 from '../../../CoursesCard/CoursesCard2';
import {Grid, Typography, Fade, Box} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
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

const AllCourses = (props) => {
    const classes = useStyles();
    const [courses, setCourses] = React.useState([]);
    const [currPage, setCurrPage] = React.useState(1);
    let pageNumber = Math.ceil((props.dataLength)/5);

    const getCourses = (current) => {
        axios.get(`http://localhost:8080/api/courses?page=${current}`)
        .then(res => {
            const data = res.data;
            setCourses(data);
        })
        .catch(err => console.log(err));
    }

    const changeHandle = (event, value) =>{
        setCurrPage(value);
    }
    
    useEffect(()=>{
        getCourses(currPage);
        return () => {
            setCourses([]);
        }
    }, [currPage])

    return (
        <div className={classes.root}>
        <Typography variant='h4' className={classes.customText}>All courses</Typography>
        <Grid container direction='column' spacing={3} className={classes.customGrid}>
            {
                courses.map((course, key) =><Fade in={true} timeout={1000} key={key}><Grid item>
                    <CoursesCard2 course={course}></CoursesCard2>
                    </Grid></Fade>)
            }
        </Grid>
        <Box my={1} display="flex" justifyContent="center">
        <Pagination count={pageNumber ? pageNumber : 1} defaultPage={pageNumber ? pageNumber/2+1 : 1} onChange={changeHandle} size="large" 
        renderItem={(item)=> <PaginationItem {...item} 
        className={classes.customPagination} classes={{selected: classes.selected}}/>}/>
        </Box>
        </div>
    );
}

export default AllCourses;