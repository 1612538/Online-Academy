import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import VideoPlay from "../../../assets/videoplay.png";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "left",
  },
  paper: {
    backgroundColor: "rgba(245,242,237,1)",
    width: "100%",
    cursor: "pointer",
    borderRadius: "0px",
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    "&:hover": {
      backgroundColor: "rgba(220,210,210,1)",
    },
  },
  paperActive: {
    backgroundColor: "rgba(230,225,220,1)",
    width: "100%",
    cursor: "pointer",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: "rgba(210,200,195,1)",
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
    overflow: "hidden",
    lineHeight: 1.3,
    width: "90%",
    textTransform: "none",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

function currentDate() {
  var date = new Date();
  var dateStr =
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2) +
    " " +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear();
  return dateStr;
}

const LectureCard = (props) => {
  useEffect(() => {}, []);

  const handleClick = async () => {
    if (props.canClick) {
      await props.setCurrLecture({ ...props.data });
      props.setPVideo(props.data.video);
      if (localStorage.getItem("role") === "0") {
        await props.getCurrentState(props.data.idlecture, props.data.title);
        props.setOpen(true);
      }
    }
    console.log(props.data);
  };

  const handleDelete = async (idcourse, idlecture) => {
    if (props.canClick) {
      const data = await axios.delete(
        `http://localhost:8080/api/courselectures/${idcourse}/${idlecture}`,
        props.config
      );
      if (data.data.success === true) {
        const data2 = {
          lastupdate: currentDate(),
        };
        const returnData2 = await axios.put(
          `http://localhost:8080/api/courses/${props.idcourse}`,
          data2,
          props.config
        );
        if (returnData2.data.success === true) {
          props.setUpdate(!props.update);
        }
      }
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper
        className={
          props.data.idlecture === props.active
            ? classes.paperActive
            : classes.paper
        }
        onClick={handleClick}
      >
        <Grid container>
          <Grid container justify="center" item xs={4}>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={VideoPlay} />
            </ButtonBase>
          </Grid>
          <Grid item xs={8} container>
            <Grid item xs container>
              <Grid item xs={8}>
                <Typography
                  gutterBottom
                  variant="h6"
                  className={classes.custom}
                  style={{ margin: "10px 0 -10px 0", fontSize: "19px" }}
                >
                  {props.data.title}
                </Typography>
              </Grid>
              {props.isCompleted() === 1 ? (
                <Grid
                  item
                  xs={4}
                  style={{
                    color: "#388e3c",
                    fontSize: "0.7rem",
                    paddingTop: "5px",
                  }}
                >
                  <CheckIcon fontSize="small"></CheckIcon>Completed
                </Grid>
              ) : localStorage.getItem("role") === "1" ? (
                <Grid
                  container
                  item
                  xs={4}
                  justify="flex-end"
                  style={{ paddingTop: "3px" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{
                      marginRight: "10px",
                      maxWidth: "35px",
                      maxHeight: "35px",
                      minWidth: "35px",
                      minHeight: "35px",
                    }}
                    onClick={() => {
                      handleDelete(props.data.idcourse, props.data.idlecture);
                    }}
                  >
                    <DeleteIcon></DeleteIcon>
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={4}></Grid>
              )}
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  className={classes.custom}
                  style={{ margin: "-10px 0px -6px 0px", height: "45px" }}
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
