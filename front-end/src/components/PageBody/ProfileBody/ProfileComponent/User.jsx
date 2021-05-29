import React, {useEffect, useState} from 'react';
import {Grid, Typography, Avatar, Fade, Box} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { makeStyles } from '@material-ui/core/styles';
import CoursesCard from '../../../CoursesCard/CoursesCard';

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
    customPagination: {
        color: 'white',
    },
    selected: {
        backgroundColor: 'rgba(255,255,255, 0.7) !important',
        color:'black',
    },
  }));

const ProfileBody = (props) => {
    const classes = useStyles();
    const [favoriteCourses, setFavoriteCourses] = React.useState([]);
    const [enrolledCourses, setEnrolledCourses] = React.useState([]);
    const [currPageF, setCurrPageF] = React.useState(1);
    const [currPageE, setCurrPageE] = React.useState(1);
    const [pageNumberF, setPageNumberF] = useState(1);
    const [pageNumberE, setPageNumberE] = useState(1);
    const [open, setOpen] = useState(true);

    const getFavoriteCourses = async (current) => {
        const data = await axios.get(`http://localhost:8080/api/favoritecourses/${localStorage.getItem('iduser')}?page=${current}`, {headers: {'x-access-token': localStorage.getItem('accessToken')}})
        let array = [];
        for (let i = 0; i< data.data.length;i++)
            {
                const newdata = await axios.get(`http://localhost:8080/api/courses/${data.data[i].idcourses}`)
                array.push(newdata.data);
            }
        setFavoriteCourses(array);
        setOpen(true);  
    }

    const getLengthF = async ()=>{
        const length = await axios.get(`http://localhost:8080/api/favoritecourses/${localStorage.getItem('iduser')}`, {headers: {'x-access-token': localStorage.getItem('accessToken')}});
        setPageNumberF(Math.ceil((length.data.length)/5));
    }

    const getEnrolledCourses = async (current) => {
        const data = await axios.get(`http://localhost:8080/api/enrolledcourses/${localStorage.getItem('iduser')}?page=${current}`, {headers: {'x-access-token': localStorage.getItem('accessToken')}})
        let array = [];
        for (let i = 0; i< data.data.length;i++)
        {
            const newdata = await axios.get(`http://localhost:8080/api/courses/${data.data[i].idcourses}`)
            array.push(newdata.data);
        }
        setEnrolledCourses(array);
        setOpen(true);  
    }

    const getLengthE = async ()=>{
        const length = await axios.get(`http://localhost:8080/api/favoritecourses/${localStorage.getItem('iduser')}`, {headers: {'x-access-token': localStorage.getItem('accessToken')}});
        setPageNumberE(Math.ceil((length.data.length)/5));
    }
    
    const changeHandleF = (event, value) =>{
        setOpen(false);
        setTimeout(() => setCurrPageF(value), 500);
    }

        
    const changeHandleE = (event, value) =>{
        setOpen(false);
        setTimeout(() => setCurrPageE(value), 500);
    }

    useEffect(async ()=>{
        await getFavoriteCourses(currPageF);
        await getLengthF();
        await getEnrolledCourses(currPageE);
        await getLengthE();
        
        return () => {
            setFavoriteCourses([]);
            setEnrolledCourses([]);
        }
    }, [currPageF, currPageE])

    return (
        <Grid container className={classes.customGrid1} spacing={4}>
            <Grid item xs={12}>
            <Typography variant='h5' className={classes.customText3}>My favorite courses</Typography>
            <Fade in={open} timeout={500}>
            <Grid container spacing={3} justify='center'>
                {
                    favoriteCourses.map((course, key) =><Grid item key={key}>
                        <CoursesCard course={course}></CoursesCard>
                        </Grid>)
                }
            </Grid>
            </Fade>
            <Box my={1} display="flex" justifyContent="center">
            <Pagination count={pageNumberF ? pageNumberF : 1} defaultPage={1} onChange={changeHandleF} size="large" 
            renderItem={(item)=> <PaginationItem {...item} 
            className={classes.customPagination} classes={{selected: classes.selected}}/>}/>
            </Box>
            </Grid>
            <Grid item xs={12}>
            <Typography variant='h5' className={classes.customText3}>My enrolled courses</Typography>
            <Fade in={open} timeout={500}>
            <Grid container spacing={3} justify='center'>
                {
                    enrolledCourses.map((course, key) =><Grid item key={key}>
                        <CoursesCard course={course}></CoursesCard>
                        </Grid>)
                }
            </Grid>
            </Fade>
            <Box my={1} display="flex" justifyContent="center">
            <Pagination count={pageNumberE ? pageNumberE : 1} defaultPage={1} onChange={changeHandleE} size="large" 
            renderItem={(item)=> <PaginationItem {...item} 
            className={classes.customPagination} classes={{selected: classes.selected}}/>}/>
            </Box>
            </Grid>
        </Grid>
    )
}

export default ProfileBody;