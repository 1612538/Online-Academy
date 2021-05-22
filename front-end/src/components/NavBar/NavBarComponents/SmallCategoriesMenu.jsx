import React, { useEffect } from "react";
import {makeStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ArrowBackIos';
import ExpandMore from '@material-ui/icons/ArrowForwardIos';
import axios from 'axios';

import "@fontsource/roboto";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '360px',
      backgroundColor: theme.palette.background.paper,
    },
  }));



export default function SmallCatMenu(props) {
    const [open, setOpen] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [catActive, setCatActive] = React.useState(-1);
    const [small_categories, setSmall_Categories] = React.useState([]);

    const getCategories = () =>{
      axios.get('http://localhost:8080/api/categories')
      .then(res => {
        const cats = res.data;
        setCategories(cats);
      })
      .catch(err => console.log(err));
    }

    const getSmallCategories = (id) => {
      axios.get(`http://localhost:8080/api/smallcategories/byCatID/${id}`)
      .then(res => {
        const smallcats = res.data;
        setSmall_Categories(smallcats);
      })
      .catch(err=> console.log(err));
    }

    useEffect(()=>{
      getCategories();
    });

    const handleClick = (id) => {
      if (open) {
        if (catActive === id)
          setOpen(!open);
        else {
          setCatActive(id);
          getSmallCategories(id);
        }
      }
      else {
        setOpen(!open);
        setCatActive(id);
        getSmallCategories(id);
      }
    }

    const classes = useStyles();
      return (
          <Grid container>
        <Grid item className={classes.root}>
        <Paper variant='outlined'>
        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {
          categories.map( cat => <ListItem button onClick={() => handleClick(cat.idcategory)}>
            <ListItemText primary={cat.name} />
            {
              open && catActive===cat.idcategory ? <ExpandLess /> : <ExpandMore />
            }
          </ListItem>)
        }
      </List>
      </Paper>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
      <Paper variant='outlined'>
      <Grid item>
              <List component="div">
                {
                  small_categories.map( smallcat => <ListItem button className={classes.root} onClick={props.handleClose}>
                    <ListItemText primary={smallcat.name} />
                  </ListItem>)
                }
              </List>
              </Grid>
              </Paper>
        </Collapse>
        </Grid>
      );
  }