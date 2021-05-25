import React, {useEffect} from "react";
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import GetData from '../getData';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
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
    tooltip1: {
        position: 'absolute',
        left: theme.spacing(11),
        backgroundColor:'#eeeeee',
        zIndex: 1,
    },
    tooltip2: {
        position: 'absolute',
        right:theme.spacing(11),
        backgroundColor:'#eeeeee',
        zIndex: 1,
    },
  }));

function TopView() {
    const classes = useStyles();
    const [courses, setCourses] = React.useState([]);
    const [showNext, setShowNext] = React.useState(true);
    const [showPrevious, setShowPrevious] = React.useState(false);
    const [currPage, setCurrPage] = React.useState(1);

    const getCourses = (current) => {
        axios.get(`http://localhost:8080/api/coursesbydate/${current}`)
        .then(res => {
            const data = res.data;
            setCourses(data);
        })
        .catch(err => console.log(err));
    }

    const handleClick1 = () => {
        setCurrPage(currPage - 1);
        setShowPrevious(false);
        setShowNext(true);
        setCourses([]);
    }

    const handleClick2 = () => {
        setCurrPage(currPage + 1);
        setShowPrevious(true);
        setShowNext(false);
        setCourses([]);
    }

    useEffect(()=>{
        getCourses(currPage);
    }, [currPage])

    return (
        <div className={classes.root}>
        <Typography variant='h4' className={classes.customText}>Top newest courses</Typography>
        <Grid container justify='center' alignItems='center' style={{padding: 20, width: '100%'}}>
        <Fade in={showPrevious} className={classes.tooltip1}>
            <Tooltip title="Previous"  onClick={handleClick1}>
            <Fab>
                <ArrowLeftIcon fontSize='large' color='primary' />
            </Fab>
            </Tooltip>
        </Fade>
        <Grid item  style={{width:'1564px', height: '320px'}}>
        <GetData courses={courses}></GetData>
        </Grid>
        <Fade in={showNext}  className={classes.tooltip2}>
            <Tooltip title="Next" onClick={handleClick2}>
            <Fab>
                <ArrowRightIcon fontSize='large' color='primary' />
            </Fab>
            </Tooltip>
        </Fade>
        </Grid>
        </div>
    );
}

export default TopView;