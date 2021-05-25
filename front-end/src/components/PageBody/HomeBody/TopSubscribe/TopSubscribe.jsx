import React, {useEffect} from "react";
import GetData from '../GetData';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        marginTop: '30px',
    },
    customText: {
        width: '90%',
        margin: 'auto',
        fontWeight: 'bold',
        color: 'white',
        borderBottom: '1px solid white',
        paddingBottom: '2px',
        marginBottom:'10px',
    },
  });

function TopSubscribe() {
    const classes = useStyles();
    const [courses, setCourses] = React.useState([])

    const getCourses = () => {
        axios.get('http://localhost:8080/api/coursesbysubscribe')
        .then(res => {
            const data = res.data;
            setCourses(data);
        })
        .catch(err => console.log(err));
    }

    useEffect(()=>{
        getCourses();
    }, [])

    return (
        <div className={classes.root}>
        <Typography variant='h4' className={classes.customText}>Top bestseller courses</Typography>
        <Grid container justify='center' alignItems='center' style={{padding: 20, width: '100%'}}>
        <Grid item  style={{width:'1564px', height: '320px'}}>
        <GetData courses={courses}></GetData>
        </Grid>
        </Grid>
        </div>
    );
}

export default TopSubscribe;