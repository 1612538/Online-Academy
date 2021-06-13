import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
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
    marginBottom: "20px",
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

const AboutMeForm = (props) => {
  const [editor, setEditor] = useState("");

  const onEditorStateChange = (contentState) => {
    setEditor(contentState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    const data = {
      information: markup,
    };
    const returnData = await axios.put(
      `http://localhost:8080/api/users/${localStorage.getItem("iduser")}`,
      data,
      config
    );
    if (returnData.data.success) {
      props.EditClose();
      props.setUpdate(!props.update);
    }
  };

  useEffect(() => {}, []);

  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      onClose={props.EditClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit}>
        <DialogContent className={classes.root}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.customText3}>
                Edit "About me"
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.customGrid}>
            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <Typography variant="body1" style={{ color: "#9e9e9e" }}>
                Detail Description
              </Typography>
              <Editor
                editorState={editor}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                editorStyle={{ height: "300px" }}
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
            onClick={props.EditClose}
            className={classes.customButton2}
          >
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AboutMeForm;
