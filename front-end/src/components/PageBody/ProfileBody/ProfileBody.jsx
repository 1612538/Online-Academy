import React, {useEffect, useState} from 'react';
import {Grid, Typography, Avatar, Fade, Box} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { makeStyles } from '@material-ui/core/styles';
import CoursesCard from '../../CoursesCard/CoursesCard';
import {Redirect} from 'react-router-dom';

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
    const [courses, setCourses] = React.useState([]);
    const [currPage, setCurrPage] = React.useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(true);

    const getUser = async () => {
        const data = await axios.get(`http://localhost:8080/api/users/${props.match.params.id}`)
        setUser(data.data);
    }

    const getCourses = async (current) => {
        const data = await axios.get(`http://localhost:8080/api/getByTeacher/${props.match.params.id}?page=${current}`)
        setCourses(data.data);
        setOpen(true);  
    }

    const getLength = async ()=>{
        const length = await axios.get(`http://localhost:8080/api/getByTeacher/${props.match.params.id}`);
        setPageNumber(Math.ceil((length.data.length)/5));
    }
    
    const changeHandle = (event, value) =>{
        setOpen(false);
        setTimeout(() => setCurrPage(value), 500);
    }

    useEffect(async ()=>{
        await getUser();
        await getCourses(currPage);
        await getLength();
        
        return () => {
            setUser({});
            setCourses([]);
        }
    }, [currPage])

    return (
        <div className={classes.root}>
        { user.role === 0 || user.role === 2 || !user ? <Redirect to="/"></Redirect> : undefined}
        <Grid container direction='row' className={classes.customGrid1} spacing={3}>
            <Grid container item xs={8} spacing={3} alignItems='center'>
                <Grid item xs={10}>
                    <Typography variant='h5' className={classes.customText}>{user.username}</Typography>
                    <Typography variant='h4' className={classes.customText}>{user.firstname + " " + user.lastname}</Typography>
                    <Typography variant='h6' className={classes.customText}>{user.occupation}</Typography>
                </Grid>
            </Grid>
            <Grid container item xs={4} justify='center' alignItems='center'>
                <Avatar style={{ height: '250px', width: '250px' }} alt={user.firstname + " " + user.lastname} src="https://img-c.udemycdn.com/user/200_H/2364054_83cd_5.jpg?Expires=1622293513&Signature=EhYBO91U-pTGRq~ctA1rJuZbXojsiWHuR7~M9C1JGbKHZULiGnAhdjl1Tbfy2tNTcOmU5wvnKMkiogumch-gMwCVTdB0EdUn~kyBljRsadM3K8hIzEWPbcPaBfLi4jLchUpefDvFEZ9EgU90pYkVmAeXy01EoYL6Ty33y3WwhZjw0iHSMRXUr0jtfIosQ7ZnBFnPk~YsoEuw3W4ILAZ31zZFX5V2uD7JEWXkb27tn6lwkZNu1zHJsfnwCAkQsqPIgDaW4MeMOOO3ySyAH2jQlYMRr9bb2BHYVFtZ~BEk3iyIltnDPv5nErjDVmlWa03y5dcKKXpQXKJoGP3S9lbdJQ__&Key-Pair-Id=APKAITJV77WS5ZT7262A" />
            </Grid>
        </Grid>
        <Grid container className={classes.customGrid1} spacing={4}>
            <Grid item xs={8}>
                <Typography variant='h5' className={classes.customText3}>About me</Typography>
                <Typography variant='body1' className={classes.customText2}>{user.information}</Typography>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={12}>
            <Typography variant='h5' className={classes.customText3}>My courses</Typography>
            <Fade in={open} timeout={500}>
            <Grid container spacing={3} justify='center' style={{height: '700px'}}>
                {
                    courses.map((course, key) =><Grid item key={key}>
                        <CoursesCard course={course}></CoursesCard>
                        </Grid>)
                }
            </Grid>
            </Fade>
            <Box my={1} display="flex" justifyContent="center">
            <Pagination count={pageNumber ? pageNumber : 1} defaultPage={1} onChange={changeHandle} size="large" 
            renderItem={(item)=> <PaginationItem {...item} 
            className={classes.customPagination} classes={{selected: classes.selected}}/>}/>
            </Box>
            </Grid>
        </Grid>
        </div>
    )
}

export default ProfileBody;