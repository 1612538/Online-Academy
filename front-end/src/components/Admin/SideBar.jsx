import React, { useEffect } from "react";
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
import axios from "axios";
import History from "../History";

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
  nested2: {
    paddingLeft: "50px",
  },
  customActive: {
    backgroundColor: "rgba(30,136,229,0.3)",
    "&:hover": {
      backgroundColor: "rgba(30,136,229,0.6)",
    },
  },
}));

const SideBar = ({ match, update }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [cat, setCat] = React.useState([]);
  const [smallcat, setSmallCat] = React.useState([]);
  const [opens, setOpens] = React.useState([]);
  const [active, setActive] = React.useState("");

  const getCat = async () => {
    const data = await axios.get("http://localhost:8080/api/categories");
    setCat(data.data);
    for (let i = 0; i < data.data.length; i++) {
      let tmp = opens;
      tmp.push(false);
      setOpens(tmp);
    }
  };

  const getSmallCat = async () => {
    const data = await axios.get("http://localhost:8080/api/smallcategories");
    setSmallCat(data.data);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCat();
      await getSmallCat();
    };
    fetchData();
    return () => {};
  }, [update]);

  useEffect(() => {
    setActive(match.url);
  }, [match]);

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
        <ListItem
          button
          onClick={() => {
            History.push(`/admin/account`);
          }}
          className={active === "/admin/account" ? classes.customActive : ""}
        >
          <ListItemIcon>
            <Account />
          </ListItemIcon>
          <ListItemText primary="My account" />
        </ListItem>
        <ListItem
          button
          className={
            active === "/admin/maincategories" ? classes.customActive : ""
          }
          onClick={() => {
            History.push(`/admin/maincategories`);
          }}
        >
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="Main categories" />
        </ListItem>
        <ListItem button onClick={handleClick2}>
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="Categories" />
          {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <div style={{ overflow: "hidden" }}>
          <Slide in={open2} timeout={300} unmountOnExit>
            <List component="div" disablePadding>
              {cat.map((obj, key) => (
                <ListItem
                  key={key}
                  button
                  className={
                    classes.nested +
                    " " +
                    (active === `/admin/categories/${obj.idcategory}`
                      ? classes.customActive
                      : "")
                  }
                  onClick={() => {
                    History.push(`/admin/categories/${obj.idcategory}`);
                  }}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={obj.name} />
                </ListItem>
              ))}
            </List>
          </Slide>
        </div>
        <ListItem
          button
          className={active === "/admin/users" ? classes.customActive : ""}
          onClick={() => {
            History.push(`/admin/users`);
          }}
        >
          <ListItemIcon>
            <User />
          </ListItemIcon>
          <ListItemText primary="User list" />
        </ListItem>
        <ListItem
          button
          className={active === "/admin/teachers" ? classes.customActive : ""}
          onClick={() => {
            History.push(`/admin/teachers`);
          }}
        >
          <ListItemIcon>
            <User />
          </ListItemIcon>
          <ListItemText primary="Teacher list" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <Book />
          </ListItemIcon>
          <ListItemText primary="Courses list" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <div style={{ overflow: "hidden" }}>
          <Slide in={open} timeout={300} unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                className={
                  active === "/admin/courses" ? classes.customActive : ""
                }
                onClick={() => {
                  History.push(`/admin/courses`);
                }}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="All courses" />
              </ListItem>
              {cat.map((obj, key) => (
                <div key={key}>
                  <ListItem
                    button
                    className={classes.nested}
                    onClick={() => {
                      let tmp = opens;
                      tmp[key] = !tmp[key];
                      setOpens([...tmp]);
                    }}
                  >
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary={obj.name} />
                    {opens[key] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <div style={{ overflow: "hidden" }}>
                    <Slide in={opens[key]} timeout={300} unmountOnExit>
                      <List component="div" disablePadding>
                        {smallcat
                          .filter((x) => x.idcategory === obj.idcategory)
                          .map((obj2, key2) => (
                            <ListItem
                              button
                              className={
                                classes.nested2 +
                                " " +
                                (active ===
                                `/admin/courses/${obj2.idsmall_category}`
                                  ? classes.customActive
                                  : "")
                              }
                              key={key2}
                              onClick={() => {
                                History.push(
                                  `/admin/courses/${obj2.idsmall_category}`
                                );
                                setActive(
                                  "5." + key.toString() + "." + key2.toString()
                                );
                              }}
                            >
                              <ListItemIcon></ListItemIcon>
                              <ListItemText primary={obj2.name} />
                            </ListItem>
                          ))}
                      </List>
                    </Slide>
                  </div>
                </div>
              ))}
            </List>
          </Slide>
        </div>
      </List>
    </Container>
  );
};

export default SideBar;
