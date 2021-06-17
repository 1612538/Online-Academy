import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Expand from "@material-ui/icons/ExpandMore";

import axios from "axios";

import "../../../assets/hidescrollbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "auto",
    overflow: "auto",
    maxHeight: "600px",
    padding: "10px 0px",
  },
  text2: {
    color: "black",
    padding: "0px 25px 0px 15px",
    marginTop: "5px",
    fontWeight: "bold",
    borderBottom: "1px solid rgba(0,0,0,0.3)",
    textAlign: "left",
  },
  text3: {
    color: "black",
    margin: "7px 0px 7px 0px",
    padding: "0px 25px 7px 15px",
    borderBottom: "2px solid rgba(0,0,0,0.3)",
    textAlign: "left",
  },
}));

const Feedback = (props) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const config = {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      idfeedback: comments.length,
      idcourse: props.idcourse,
      iduser: localStorage.getItem("iduser"),
      comment: text,
      rate: value,
    };
    const returnData = await axios.post(
      "http://localhost:8080/api/comments",
      data,
      config
    );
    if (returnData.data.success === true) {
      const user = await axios.get(
        `http://localhost:8080/api/users/${data.iduser}`
      );
      data.name = user.data.username;
      data.img = user.data.img;
      let tmp = comments;
      setText("");
      tmp.push(data);
      setComments([...tmp]);
    }
  };

  const getComment = async () => {
    const data = await axios.get(
      `http://localhost:8080/api/commentsbycourse/${props.idcourse}`
    );
    let tmpData = data.data;
    for (let tmp of tmpData) {
      const user = await axios.get(
        `http://localhost:8080/api/users/${tmp.iduser}`
      );
      tmp.name = user.data.username;
      tmp.img = user.data.img;
    }
    setComments(tmpData);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getComment();
    };
    fetchData();
    return () => {
      setComments([]);
    };
  }, [props.idcourse]);

  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root + " example"}
    >
      {props.isEnrolled === false ? (
        <Grid item xs style={{ textAlign: "center" }}>
          You can't give feedbacks for courses that you haven't enrolled
        </Grid>
      ) : (
        <Grid item xs={10} style={{ marginBottom: "10px" }}>
          <form onSubmit={handleSubmit}>
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  placeholder="Your comment"
                  value={text}
                  multiline
                  rows={4}
                  rowsMax={6}
                  fullWidth
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
              </Grid>
              <Grid container item xs={6} justify="center">
                <Grid item xs={10}>
                  <Rating
                    name="rate"
                    value={value}
                    size="large"
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  ></Rating>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Button
                  type="submit"
                  className={classes.button}
                  color="primary"
                  variant="contained"
                >
                  Comment
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      )}
      {comments.map((obj, key) => (
        <Grid container item xs={10} key={key}>
          <Grid item xs={1}>
            <Avatar alt={obj.name} src={obj.img}></Avatar>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" className={classes.text2}>
              {obj.name}
            </Typography>
          </Grid>
          <Grid item xs={5} style={{ marginTop: "5px" }}>
            <Rating
              readOnly
              value={obj.rate}
              precision={0.5}
              size="small"
            ></Rating>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" className={classes.text3}>
              {obj.comment}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Feedback;
