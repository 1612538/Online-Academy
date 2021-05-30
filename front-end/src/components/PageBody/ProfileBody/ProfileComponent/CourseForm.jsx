import { makeStyles } from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import {Grid, Typography, TextField, Button, Dialog, DialogContent, DialogActions, MenuItem, InputLabel, Select, ListSubheader, FormControl} from '@material-ui/core';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '85%',
      paddingTop:'50px !important',
      padding:'0px 50px 10px 50px',
      margin: 'auto',
      backgroundColor: 'white',
      borderRadius: '5px',
    },
    customText3: {
        fontWeight: 'bold',
        borderBottom: '1px solid black',
        paddingBottom: '2px',
        marginBottom: '20px',
    },
    customButton1: {
        margin:'10px',
        backgroundColor: '#4caf50',
        color: 'white',
        '&:hover': {
            backgroundColor: '#357a38',
        },
    },
    customButton2: {
        margin:'10px',
        backgroundColor: '#35baf6',
        color: 'white',
        '&:hover': {
            backgroundColor: '#2196f3',
        },
    },
    customGrid: {
        width: '90%',
        margin: 'auto',
    },
    formControl: {
        width: '160px',
        marginTop:'16px',
    },
}));

const CourseForm = (props) => {

    const [editor , setEditor] = useState('');
    const [small_cats ,setSmall_Categories] = useState([]);
    const [name ,setName] = useState(null);
    const [cat ,setCat] = useState(null);
    const [price ,setPrice] = useState(null);
    const [briefDesc ,setBriefDesc] = useState(null);
    const [file ,setFile] = useState(null);
    const [file2 ,setFile2] = useState(null);
    const [filename ,setFilename] = useState(null);
    const [filename2 ,setFilename2] = useState(null);

    const onEditorStateChange = (contentState) => {
        setEditor(contentState);
    }

    const getSmallCategories = () => {
        axios.get(`http://localhost:8080/api/smallcategories`)
        .then(res => {
          const smallcats = res.data;
          setSmall_Categories(smallcats);
        })
        .catch(err=> console.log(err));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'x-access-token': localStorage.getItem('accessToken'),
            }
        }
        const hashtagConfig = {
            trigger: '#',
            separator: ' ',
          }
        const rawContentState = convertToRaw(editor.getCurrentContent());
        const markup = draftToHtml(
            rawContentState, 
            hashtagConfig, 
            true 
        );
        let formData = new FormData();
        formData.append("imageInput", file);
        formData.append('name', name);
        formData.append('idteacher', localStorage.getItem('iduser'));
        formData.append('price', price);
        formData.append('briefDesc', briefDesc);
        formData.append('detailDesc', markup);
        formData.append('smallcategory', cat);
        formData.append('videoInput', file2);
        const returnData = await axios.post('http://localhost:8080/api/courses', formData, config)
        if (returnData.data.success)
            props.AddClose();
    }

    const handleImage = (e) => {
        setFilename(e.target.files[0].name);
        setFile(e.target.files[0]);
    }

    const handleVideo = (e) => {
        setFilename2(e.target.files[0].name);
        setFile2(e.target.files[0]);
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    
    const handleCat = (e) => {
        setCat(e.target.value);
    }

    
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

        
    const handleBriefDesc = (e) => {
        setBriefDesc(e.target.value);
    }

    useEffect(()=>{
        getSmallCategories();
        return () => {
            setSmall_Categories([]);
        }
    }, [])

    const classes = useStyles();
    return (
        <Dialog
        open={props.open}
        keepMounted
        onClose={props.AddClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth='lg'
        >
        <form onSubmit={handleSubmit}>
        <DialogContent className={classes.root}>
        <Grid container direction='row'>
        <Grid item xs={12}>
        <Typography variant='h5' className={classes.customText3}>Create course</Typography>
        </Grid>
        </Grid>
        <Grid container className={classes.customGrid}>   
        <Grid container item xs={12} spacing={4}>
        <Grid item xs={7}>
        <TextField
          id="coursename"
          label="Course name"
          fullWidth
          margin="normal"
          required
          onChange={handleName}
        />
        </Grid>
        <Grid item xs={3}>
            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Category</InputLabel>
            <Select defaultValue="" id="grouped-select" required onChange={handleCat}>
            {
                small_cats.map((smallcat, key) => <MenuItem value={smallcat.idsmall_category} key={key}>{smallcat.name}</MenuItem>)
            }
            </Select>
            </FormControl>
        </Grid>
        <Grid item xs={2}>
        <TextField
          id="price"
          label="Price"
          fullWidth
          margin="normal"
          required
          onChange={handlePrice}
        />
        </Grid>
        </Grid> 
        <Grid item xs={12}>
        <TextField
          id="briefdescription"
          label="Brief description"
          fullWidth
          margin="normal"
          required
          onChange={handleBriefDesc}
        />
        </Grid>
        <Grid item xs={12} style={{marginTop:'20px'}}>
        <Typography variant='body1' style={{color: '#9e9e9e'}}>Detail Description</Typography>
        <Editor
            editorState={editor}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            editorStyle={{height: '300px'}}
            handlePastedText={() => false} 
        />
        </Grid>
        <Grid item xs={6}>
        <Button variant="contained" component="label" color='primary'>
            Choose course image
            <input type="file" hidden onChange={handleImage} accept="image/*"/>
        </Button>
        <Typography variant='body1' style={{marginTop:'5px', width:'300px'}} noWrap>{filename}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Button variant="contained" component="label" color='primary'>
            Choose course preview video
            <input type="file" hidden onChange={handleVideo} accept="video/*"/>
        </Button>
        <Typography variant='body1' style={{marginTop:'5px', width:'300px'}} noWrap>{filename2}</Typography>
        </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
            <Button type='submit' component='button' variant="contained" className={classes.customButton1}>
            Create course
          </Button>
          <Button variant="contained" onClick={props.AddClose} className={classes.customButton2}>
            Close
          </Button>
        </DialogActions>
        </form>
        </Dialog>

    )
}

export default CourseForm;