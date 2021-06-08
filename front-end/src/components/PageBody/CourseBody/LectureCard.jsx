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
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(220,220,220,1)",
    },
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
    width: "90%",
    textTransform: "none",
  },
}));

const LectureCard = (props) => {
  useEffect(() => {
    console.log(props.data);
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper
        className={classes.paper}
        onClick={() => {
          props.setCurrLecture(props.data);
        }}
      >
        <Grid container>
          <Grid container justify="center" item xs={4}>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={VideoPlay} />
            </ButtonBase>
          </Grid>
          <Grid item xs={8} container>
            <Grid item xs container direction="column">
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="h6"
                  className={classes.custom}
                  style={{ margin: "10px 0 -10px 0" }}
                >
                  {props.data.title}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  className={classes.custom}
                  style={{ margin: "-10px 0px -6px 0px" }}
                  key={Date()}
                  dangerouslySetInnerHTML={{ __html: props.data.description }}
                ></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LectureCard;
