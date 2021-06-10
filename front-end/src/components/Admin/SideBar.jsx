import React from "react";
import {
  Grid,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Slide,
  ListItemText,
  Box,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import User from "@material-ui/icons/AccountCircleRounded";
import Account from "@material-ui/icons/PersonRounded";
import Category from "@material-ui/icons/Category";
import Book from "@material-ui/icons/ImportContacts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "94vh",
    border: "1px solid rgba(0,0,0,0.2)",
    borderTop: "0",
    backgroundColor: "#fff",
    position: "sticky",
    top: "6vh",
    padding: "20px 0",
  },
  customText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  customList: {
    width: "100%",
  },
  nested: {
    paddingLeft: "30px",
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Box
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid rgba(0,0,0,0.2)",
          padding: "5px",
          marginBottom: "10px",
        }}
      >
        <Avatar
          src={" "}
          style={{
            height: 60,
            width: 60,
          }}
        />
        <Typography color="textSecondary" variant="h6">
          Name
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Admin
        </Typography>
      </Box>
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem button>
          <ListItemIcon>
            <Account />
          </ListItemIcon>
          <ListItemText primary="My account" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="Categories" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <div style={{ overflow: "hidden" }}>
          <Slide in={open} timeout={300} unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItem>
            </List>
          </Slide>
        </div>
        <ListItem button>
          <ListItemIcon>
            <User />
          </ListItemIcon>
          <ListItemText primary="User list" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Book />
          </ListItemIcon>
          <ListItemText primary="Courses list" />
        </ListItem>
      </List>
    </Container>
  );
};

export default SideBar;
