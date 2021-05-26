import React, { useEffect } from "react";
import {Grid, Typography, Box, Fade, FormControl, Select, InputLabel, MenuItem} from '@material-ui/core'
import CoursesCard2 from '../../CoursesCard/CoursesCard2';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import DownIcon from '@material-ui/icons/ArrowDownward';
import UpIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles({
    cssLabel: {
        color: "#000",
        "&.Mui-focused": {
          color: "#000"
        }
      },
    formControl: {
        margin: '5%',
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: '10px',
      },
    root: {
        marginTop: '30px',
        padding: 20,
    },
    customText: {
        marginLeft: '8%',
        fontWeight: 'bold',
        color: 'white',
    },
    customGrid2: {
        borderBottom: '1px solid white',
        paddingBottom: '2px',
        width: '90%',
        margin: 'auto',
    },
    customGrid: {
        border: '1px solid white',
        borderTop: 0,
        borderBottomLeftRadius: '6px',
        borderBottomRightRadius: '6px',
        width: 1000,
        margin: 'auto',
        padding: 20,
        height: 940,
    },
    customPagination: {
        color: 'white',
    },
    selected: {
        backgroundColor: 'rgba(255,255,255, 0.7) !important',
        color:'black',
    },
  });

const SearchBody = (props) => {
    const classes = useStyles();
    let pageNumber = Math.ceil((props.dataLength)/5);

    const changeHandle = (event, value) =>{
        props.setCurrPage(value);
    }

    return (
        <div className={classes.root}>
        <Grid container direction='row' spacing={0} className={classes.customGrid2}>
        <Grid item xs={10}>
        <Typography variant='h4' className={classes.customText}>All courses by "{props.keyword}"</Typography>
        </Grid>
        <Grid item xs={2}>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label" className={classes.cssLabel}>Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.sort}
          onChange={props.handleChange}
          MenuProps={{
            disableScrollLock: true
          }}
        >
          <MenuItem value={1}>Rating<DownIcon></DownIcon></MenuItem>
          <MenuItem value={2}>Price<UpIcon></UpIcon></MenuItem>
        </Select>
      </FormControl>
        </Grid>
        </Grid>
        <Grid container direction='column' spacing={3} className={classes.customGrid}>
            {
                props.courses.map((course, key) =><Fade in={true} timeout={1000} key={key}><Grid item>
                    <CoursesCard2 course={course}></CoursesCard2>
                    </Grid></Fade>)
            }
        </Grid>
        <Box my={1} display="flex" justifyContent="center">
        <Pagination count={pageNumber ? pageNumber : 1} onChange={changeHandle} size="large" 
        renderItem={(item)=> <PaginationItem {...item} 
        className={classes.customPagination} classes={{selected: classes.selected}}/>}/>
        </Box>
        </div>
    );
}

export default SearchBody;