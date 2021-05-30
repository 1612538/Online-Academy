import React, {useEffect, useState} from 'react';
import {Grid, Typography, Avatar} from '@material-ui/core';
import User from './ProfileComponent/User';
import Teacher from './ProfileComponent/Teacher';

import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
  }));

const ProfileBody = () => {
    const classes = useStyles();
    const [user, setUser] = useState({});

    const getUser = async () => {
        const data = await axios.get(`http://localhost:8080/api/users/${localStorage.getItem('iduser')}`)
        setUser(data.data);
    }

    useEffect(()=>{ 
        const fetchData = async () => {
            await getUser();
        }
        fetchData();
        return () => {
            setUser({});
        }
    }, [])

    return (
        <div className={classes.root}>
        <Grid container direction='row' className={classes.customGrid1} spacing={4}>
            <Grid container item xs={8} spacing={2} alignItems='center'>
                <Grid item xs={10}>
                    <Typography variant='h5' className={classes.customText}>{user.username}</Typography>
                    <Typography variant='h4' className={classes.customText}>{user.firstname + " " + user.lastname}</Typography>
                    <Typography variant='h6' className={classes.customText}>{user.occupation}</Typography>
                </Grid>
            </Grid>
            <Grid container item xs={4} justify='center' alignItems='center'>
                <Avatar style={{ height: '250px', width: '250px' }} alt={user.firstname} src={`http://localhost:8080/${user.img}`} />
            </Grid>
        </Grid>
        {
            localStorage.getItem('role') === '0' ?
            <User></User> : localStorage.getItem('role') === '1' ? <Teacher></Teacher> : <Redirect to='/'></Redirect>
        }
        </div>
    )
}

export default ProfileBody;