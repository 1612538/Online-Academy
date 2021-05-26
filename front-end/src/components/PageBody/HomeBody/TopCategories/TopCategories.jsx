import React, { useEffect, useState } from "react";
import {Grid, Typography, Box, Fade} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import CatCard from '../../../CoursesCard/CategoriesCard';
import axios from 'axios';

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
  });


const TopCats = () => {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const getCats = () => {
        axios.get(`http://localhost:8080/api/smallcategoriesbycount`)
        .then(res => {
            const data = res.data;
            setCategories(data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getCats();
        return () => {
            setCategories([]);
        }
    }, []);

    return (
        <div className={classes.root}>
        <Typography variant='h4' className={classes.customText}>Categories that most people enrolled</Typography>
        <Grid container justify='center' alignItems='center' style={{padding: 20, width: '100%'}}>
        <Grid item  style={{width:'1564px', height: '200px'}}>
        <Grid container direction="row" spacing={2}>
        {
        categories.map((cat, key) =><Fade in={true} timeout={1000} key={key}><Grid item>
            <CatCard categories={cat}></CatCard>
            </Grid></Fade>)
        }
        </Grid>
        </Grid>
        </Grid>
        </div>
    )
}

export default TopCats;