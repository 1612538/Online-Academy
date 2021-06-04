import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import VideoPlay from "../../../assets/videoplay.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "left",
  },
  paper: {
    backgroundColor: "rgba(250,242,237,1)",
    width: "100%",
  },
  image: {
    width: 80,
    height: 80,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  custom: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    overflow: "hidden",
    lineHeight: 1.3,
    marginBottom: 2,
    width: "90%",
    textTransform: "none",
  },
}));

export default (props) => {
  useEffect(() => {}, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={4}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={VideoPlay} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={0}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="h6"
                  className={classes.custom}
                >
                  {props.data.title}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  className={classes.custom}
                >
                  {props.data.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
