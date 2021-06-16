import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Fade,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import CoursesCard2 from "../../CoursesCard/CoursesCard2";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DownIcon from "@material-ui/icons/ArrowDownward";
import UpIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles({
  cssLabel: {
    color: "#fff",
    "&.Mui-focused": {
      color: "#fff",
    },
  },
  formControl: {
    margin: "5%",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: "10px",
  },
  root: {
    marginTop: "30px",
    padding: 20,
  },
  customText: {
    marginLeft: "8%",
    fontWeight: "bold",
    color: "white",
  },
  customGrid2: {
    borderBottom: "1px solid white",
    paddingBottom: "2px",
    width: "90%",
    margin: "auto",
  },
  customGrid: {
    border: "1px solid white",
    borderTop: 0,
    borderBottomLeftRadius: "6px",
    borderBottomRightRadius: "6px",
    width: 1000,
    margin: "auto",
    padding: 20,
    height: 940,
  },
  customPagination: {
    color: "white",
  },
  selected: {
    backgroundColor: "rgba(255,255,255, 0.7) !important",
    color: "black",
  },
});

const SearchBody = (props) => {
  const classes = useStyles();
  let pageNumber = Math.ceil(props.dataLength / 5);
  const [open, setOpen] = useState(false);

  const changeHandle = (event, value) => {
    setOpen(false);
    setTimeout(() => {
      props.setCurrPage(value);
    }, 500);
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  useEffect(() => {
    setOpen(false);
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  }, [props.sort, props.keyword]);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        spacing={0}
        className={classes.customGrid2}
      >
        <Grid item xs={10}>
          <Typography variant="h4" className={classes.customText}>
            All courses by "{props.keyword}"
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControl className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-label"
              className={classes.cssLabel}
            >
              Sort by
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={props.handleChange}
              MenuProps={{
                disableScrollLock: true,
              }}
              defaultValue=""
            >
              <MenuItem value={1}>
                Rating<DownIcon></DownIcon>
              </MenuItem>
              <MenuItem value={2}>
                Price<UpIcon></UpIcon>
              </MenuItem>
              <MenuItem value={3}>Default</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Fade in={open} timeout={500}>
        <Grid
          container
          direction="column"
          spacing={3}
          className={classes.customGrid}
        >
          {props.dataLength > 0 ? (
            props.courses.map((course, key) => (
              <Grid item key={key}>
                <CoursesCard2 course={course}></CoursesCard2>
              </Grid>
            ))
          ) : (
            <Grid item xs>
              <Typography
                variant="h6"
                style={{ textAlign: "center", color: "white" }}
              >
                Not found
              </Typography>
            </Grid>
          )}
        </Grid>
      </Fade>
      {props.dataLength > 0 ? (
        <Box my={1} display="flex" justifyContent="center">
          <Pagination
            count={pageNumber ? pageNumber : 1}
            defaultPage={1}
            page={props.currPage}
            onChange={changeHandle}
            size="large"
            renderItem={(item) => (
              <PaginationItem
                {...item}
                className={classes.customPagination}
                classes={{ selected: classes.selected }}
              />
            )}
          />
        </Box>
      ) : undefined}
    </div>
  );
};

export default SearchBody;
