import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from "../../assets/background2.jpg";
import History from '../../components/History'

import { Redirect } from 'react-router-dom';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
    position: 'fixed',
    zIndex: '-1',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  customGrid: {
    display:'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vpassword, setVPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [fail, setFail] = useState(false);
  const [success, setSuccess] = useState(false);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailText, setErrorEmailText] = useState('Invalid email address');

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastName = (e) => {
    setLastName(e.target.value);
  }

  const handleEmail = (e) => {
    let re = /.+@.+\.[A-Za-z]+$/
    if ( re.test(e.target.value) ) {
      setEmail(e.target.value);
      setErrorEmail(false);
    }
    else {
        setErrorEmailText('Invalid email address');
        setErrorEmail(true);
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleVPassword = (e) => {
    setVPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== vpassword){
      setFail(true);
      setSuccess(false);
    }
    else {
      axios.get(`http://localhost:8080/api/usersByEmail/${email}`)
      .then(res => {
        const data = res.data;
        if (data.email){
          setErrorEmail(true);
          setErrorEmailText('Email has already been used');
          setSuccess(false);
          setFail(false);
        }
        else {
          const data = {
            username: username,
            password: password,
            email: email,
            firstname: firstName,
            lastname: lastName,
            isBlocked: 0,
            role: 0,
          }
          axios.post(`http://localhost:8080/api/users`, data)
          .then(res => {
            setSuccess(res.data.success);
            setTimeout(() => {History.push('/signin')}, 3000);
          })
          .catch(err => console.log(err));
          setFail(false);
        }
      })
      .catch(err => console.log(err));
    } 
  }

  return (
    <div>
      {
        localStorage.getItem('accessToken') ? <Redirect to='/'></Redirect> : undefined
      }
          <div className={classes.image} />
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item sm={4} md={9}></Grid>
      <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square style={{backgroundColor: 'rgba(255,255,255,0.7'}}> 
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={errorEmail}
                helperText={errorEmail ? errorEmailText : undefined}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete='off'
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleFirstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete='off'
                autoFocus
                onChange={handleUsername}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="verifypassword"
                label="Verify Password"
                type="password"
                id="verifypassword"
                autoComplete="current-password"
                onChange={handleVPassword}
              />
            </Grid>
            <Grid item xs={12} className={classes.customGrid}>
            {
            success ? <Grow in={success}>
            <Alert severity="success" variant="filled">Account is created successfully! <br/> You'll be redirect to Sign in</Alert>
           </Grow> : undefined
            }
            {
              fail ? <Grow in={fail}>
              <Alert severity="error" variant="filled">Some fields is incorrent. Please check again!</Alert>
              </Grow> : undefined
            }
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
          <Grid item xs>
              <Link href="/" variant="body2">
                Homepage
              </Link>
            </Grid>
          <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        </div>
      </Grid>
    </Grid>
    </div>
  );
}