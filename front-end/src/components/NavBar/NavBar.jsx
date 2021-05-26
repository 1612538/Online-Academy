import React, {Component, useEffect, useState} from "react";
import {Typography, Container, Button, ButtonGroup, Grid, InputBase} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import CategoriesMenu from './NavBarComponents/CategoriesMenu';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import History from "../History";


const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(blue[600]),
      backgroundColor: blue[600],
      paddingLeft:25,
      paddingRight:25,
      height: 60,
      '&:hover': {
        backgroundColor: blue[700],
      },
    },
}))(Button);

const ColorButtonMain = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(blue[600]),
      backgroundColor: blue[700],
      height: 60,
      paddingLeft:25,
      paddingRight:25,
      '&:hover': {
        backgroundColor: blue[800],
      },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '10px',
        width: '90%',
    },
  }));

const NavBar = () => {
    const classes = useStyles();
    const [value, setValue] = useState('');

    const handleSearch = (event) => {
      event.preventDefault();
      History.push('/search?keyword='+value);
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    useEffect(() => {

    }, [])

    return (
        <Container maxWidth="xl" style={{padding: 0 }}>
          <Typography component="div" style={{ backgroundColor: '#1e88e5', height: 60}}>
            <Grid container alignItems="center">
            <Grid item xs={2}>
            <ButtonGroup variant="contained" disableElevation aria-label="contained primary button group">
                <ColorButtonMain href='/'  style={{border: 0}}>Home</ColorButtonMain>
                <CategoriesMenu></CategoriesMenu>
            </ButtonGroup>
            </Grid>
            <Grid item xs={7}>
            <Typography component="div" style={{ backgroundColor: '#ffffff', borderRadius: '60px', height: 40, padding: '0 20px 0 20px'}}>
            <Grid container alignItems="center">
            <SearchIcon color="action"></SearchIcon>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSearch}>
            <InputBase id="Search" placeholder="Search for anything" color="secondary" style={{height: 40, width:'100%'}} onChange={handleChange}/>
            </form>
            </Grid>
            </Typography>
            </Grid>
            <Grid item xs={3}>
            <Grid container justify="flex-end">
            <ButtonGroup variant="contained" disableElevation aria-label="contained primary button group">
                <ColorButton  style={{border: 0}}>Sign in</ColorButton>
                <ColorButton  style={{border: 0}}>Sign up</ColorButton>
            </ButtonGroup>
            </Grid>
            </Grid>
            </Grid>
          </Typography>
        </Container>
    )}
export { NavBar, ColorButton } ;

