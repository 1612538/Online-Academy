import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "85%",
    paddingTop: "50px !important",
    padding: "0px 50px 10px 50px",
    margin: "auto",
    backgroundColor: "white",
    borderRadius: "5px",
  },
  customText3: {
    fontWeight: "bold",
    borderBottom: "1px solid black",
    paddingBottom: "2px",
    marginBottom: "10px",
  },
  customButton1: {
    margin: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    "&:hover": {
      backgroundColor: "#357a38",
    },
  },
  customButton2: {
    margin: "10px",
    backgroundColor: "#35baf6",
    color: "white",
    "&:hover": {
      backgroundColor: "#2196f3",
    },
  },
  customGrid: {
    width: "90%",
    margin: "auto",
  },
  formControl: {
    width: "160px",
    marginTop: "16px",
  },
}));

const AddLectureForm = (props) => {
  const [editor, setEditor] = useState("");
  const [title, setTitle] = useState("");
  const [filename, setFilename] = useState(null);
  const [file, setFile] = useState(null);

  const onEditorStateChange = (contentState) => {
    setEditor(contentState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file === null) {
      setFilename("Please choose a video");
      return;
    }
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    };
    const hashtagConfig = {
      trigger: "#",
      separator: " ",
    };
    const rawContentState = convertToRaw(editor.getCurrentContent());
    const markup = draftToHtml(rawContentState, hashtagConfig, true);
    let formData = new FormData();
    formData.append("videoInput", file);
    formData.append("title", title);
    formData.append("description", markup);
    formData.append("idcourse", props.match.params.id);
    formData.append("idlecture", props.length);
    const returnData = await axios.post(
      `http://localhost:8080/api/courselectures`,
      formData,
      config
    );
    if (returnData.data.success) {
      if (props.lectures.length === 5)
        props.setPageNumberL((prevPage) => prevPage + 1);
      else {
        let tmp = props.lectures;
        tmp.push({
          title: title,
          description: markup,
          idcourse: props.match.params.id,
          idlecture: props.length,
          video: "",
        });
        props.setLectures(tmp);
        props.lectureClose();
      }
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleVideo = (e) => {
    if (e.target.files[0]) {
      setFilename(e.target.files[0].name);
      setFile(e.target.files[0]);
    } else {
      setFilename(null);
      setFile(null);
    }
  };

  useEffect(() => {}, []);

  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={props.EditClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="md"
    >
      <form onSubmit={handleSubmit}>
        <DialogContent className={classes.root}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.customText3}>
                Add lectures
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.customGrid}
            alignItems="center"
            justify="center"
          >
            <Grid item xs={8}>
              <TextField
                id="title"
                name="title"
                type="text"
                label="Title"
                fullWidth
                margin="normal"
                required
                onChange={handleTitle}
              />
            </Grid>
            <Grid item xs={4} container justify="center">
              <Button
                variant="contained"
                component="label"
                color="primary"
                style={{ marginTop: "10px" }}
              >
                Choose video
                <input
                  type="file"
                  name="video"
                  hidden
                  onChange={handleVideo}
                  accept="video/*"
                />
              </Button>
              <Typography
                variant="body1"
                style={{
                  marginTop: "5px",
                  width: "300px",
                  textAlign: "center",
                }}
                noWrap
              >
                {filename}
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="body1" style={{ color: "#9e9e9e" }}>
                Description
              </Typography>
              <Editor
                editorState={editor}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                editorStyle={{ height: "200px" }}
                handlePastedText={() => false}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            component="button"
            variant="contained"
            className={classes.customButton1}
          >
            Accept changes
          </Button>
          <Button
            variant="contained"
            onClick={props.lectureClose}
            className={classes.customButton2}
          >
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddLectureForm;
