import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Paper,
  ListItemText,
  Fade,
  Box,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ArrowBackIos";
import ExpandMore from "@material-ui/icons/ArrowForwardIos";
import axios from "axios";
import History from "../../History";

import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "360px",
  },
}));

export default (props) => {
  const [open, setOpen] = React.useState(false);
  const categories = props.categories;
  const [catActive, setCatActive] = React.useState(-1);
  const [small_categories, setSmall_Categories] = React.useState([]);

  const getSmallCategories = () => {
    axios
      .get(`http://localhost:8080/api/smallcategories`)
      .then((res) => {
        const smallcats = res.data;
        setSmall_Categories(smallcats);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSmallCategories();
    return () => {
      setSmall_Categories([]);
    };
  }, []);

  const handleClick = (id) => {
    if (open) {
      if (catActive !== id) setCatActive(id);
    } else {
      setOpen(!open);
      setCatActive(id);
    }
  };

  const handleClose = (event) => {
    setOpen(!open);
    props.handleClose(event.target);
  };

  const classes = useStyles();
  return (
    <Grid container>
      <Grid item className={classes.root}>
        <Paper variant="outlined">
          <List component="nav" aria-labelledby="nested-list-subheader">
            {categories.map((cat, key) => (
              <ListItem
                key={key}
                button
                onMouseEnter={() => handleClick(cat.idcategory)}
                component="a"
                href={"/maincategories/" + cat.idcategory}
              >
                <ListItemText primary={cat.name} />
                {open && catActive === cat.idcategory ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Fade in={open}>
        {small_categories.filter((obj) => obj.idcategory === catActive).length >
        0 ? (
          <Paper variant="outlined" style={{ height: "max-content" }}>
            <Grid item>
              <List component="div">
                {small_categories
                  .filter((obj) => obj.idcategory === catActive)
                  .map((smallcat, key) => (
                    <ListItem
                      key={key}
                      button
                      component="a"
                      href={"/categories/" + smallcat.idsmall_category}
                      className={classes.root}
                      onClick={handleClose}
                    >
                      <ListItemText primary={smallcat.name} />
                    </ListItem>
                  ))}
              </List>
            </Grid>
          </Paper>
        ) : (
          <div></div>
        )}
      </Fade>
    </Grid>
  );
};
