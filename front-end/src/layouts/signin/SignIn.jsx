import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage from "../../assets/background2.jpg";
import CheckIcon from '@material-ui/icons/CheckCircleOutline';

import History from '../../components/History'

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPasswordText, setErrorPasswordText] = useState('');
  const [errorEmailText, setErrorEmailText] = useState('');
  const [open, setOpen] = useState(false);

  const handleEmail = (e) => {
    let re = /.+@.+\.[A-Za-z]+$/
    if ( re.test(e.target.value) ) {
      setEmail(e.target.value);
      setErrorEmailText(null);
    }
    else {
        setErrorEmailText('Invalid email address');
    }
  }

  const handlePassword = (e) =>{
    setPassword(e.target.value);
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSubmit = (e) =>  {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    }
    axios.post('http://localhost:8080/login', data)
    .then( res => {
      if (res.data.id)  {
        localStorage.setItem('iduser', res.data.id);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('role', res.data.role);
        setOpen(true);
        setTimeout(() => {History.push('/')}, 2000);
      } else {
        if (res.data.errorCode===1)
          setErrorEmailText(res.data.message);
        else
          setErrorPasswordText(res.data.message);
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
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
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              error={errorEmailText ? true : false}
              helperText={errorEmailText ? errorEmailText : undefined}
              required
              fullWidth
              id="email"
              label="Email address"
              name="email"
              autoComplete="off"
              autoFocus
              onChange={handleEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={errorPasswordText ? true : false}
              helperText={errorPasswordText ? errorPasswordText : undefined}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Homepage
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper2}>
            <CheckIcon fontSize="large" style={{color: '#4caf50'}}></CheckIcon>
            <h2 id="transition-modal-title" style={{color: '#4caf50'}}>Signed in successfully!</h2>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}