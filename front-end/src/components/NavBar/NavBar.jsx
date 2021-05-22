import React, {Component} from "react";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import { IconButton } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import CategoriesMenu from './NavBarComponents/CategoriesMenu';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import "@fontsource/roboto";

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(lightBlue[600]),
      backgroundColor: lightBlue[500],
      paddingLeft:25,
      paddingRight:25,
      height: 60,
      '&:hover': {
        backgroundColor: lightBlue[600],
      },
    },
}))(Button);

const ColorButtonMain = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(lightBlue[600]),
      backgroundColor: lightBlue[700],
      height: 60,
      paddingLeft:25,
      paddingRight:25,
      '&:hover': {
        backgroundColor: lightBlue[800],
      },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '10px',
        width: '90%',
    },
  }));

  function NavBar()  {
    const classes = useStyles();
    return (
        <Container maxWidth="xl">
          <Typography component="div" style={{ backgroundColor: '#03a9f4', borderBottomLeftRadius: 7, borderBottomRightRadius: 7, height: 60}}>
            <Grid container alignItems="center">
            <Grid item xs={2}>
            <ButtonGroup variant="contained" disableElevation aria-label="contained primary button group">
                <ColorButtonMain  style={{border: 0}}>Home</ColorButtonMain>
                <CategoriesMenu></CategoriesMenu>
            </ButtonGroup>
            </Grid>
            <Grid item xs={7}>
            <Typography component="div" style={{ backgroundColor: '#ffffff', borderRadius: '60px', height: 40, padding: '0 20px 0 20px'}}>
            <Grid container alignItems="center">
            <SearchIcon color="action"></SearchIcon>
            <form className={classes.root} noValidate autoComplete="off">
            <InputBase id="Search" placeholder="Search for anything" color="secondary" style={{height: 40, width:'100%'}}/>
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
        </Container>)
}

export { NavBar, ColorButton } ;

