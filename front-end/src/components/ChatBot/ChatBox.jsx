import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Grid, Button } from "@material-ui/core";
import ChatBot from "react-simple-chatbot";
import "../../assets/chatbot.css";
import axios from "axios";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Roboto",
  headerBgColor: "#1e88e5",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#1e88e5",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const SmallCats = (props) => {
  const [categories, setCategories] = useState([]);
  const getSmallCategories = () => {
    axios
      .get(`http://localhost:8080/api/smallcategories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSmallCategories();
  }, []);

  const handleClick = () => {
    props.triggerNextStep({ trigger: "1" });
    setCategories([]);
  };

  return (
    <Grid container justify="flex-start" spacing={1} style={{ width: "100%" }}>
      {categories.length > 0
        ? categories.map((obj, key) => (
            <Grid item xs={12} key={key}>
              <Button
                color="primary"
                variant="contained"
                style={{ textTransform: "none" }}
                onClick={handleClick}
              >
                {obj.name}
              </Button>
            </Grid>
          ))
        : undefined}
    </Grid>
  );
};

const ChatBox = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        floating
        headerTitle="Online Academy - User support"
        steps={[
          {
            id: "1",
            message: "Hello, how can I help you?",
            trigger: "searchOption",
          },
          {
            id: "searchOption",
            options: [
              { value: "search", label: "Search courses", trigger: "2" },
            ],
          },
          {
            id: "2",
            message: "What type of search you want?",
            trigger: "typeOption",
          },
          {
            id: "typeOption",
            options: [
              { value: "keyword", label: "By keyword", trigger: "3" },
              { value: "category", label: "By category", trigger: "4" },
            ],
          },
          {
            id: "3",
            message: "Ok, please type your keyword",
            trigger: "keyword",
          },
          {
            id: "4",
            message: "OK, please choose one from categories below",
            trigger: "category",
          },
          {
            id: "keyword",
            user: true,
            trigger: "handleSearch",
          },
          {
            id: "category",
            component: <SmallCats></SmallCats>,
            waitAction: true,
          },
          {
            id: "handleSearch",
            message: "OK",
            trigger: "1",
          },
        ]}
      />
    </ThemeProvider>
  );
};

export default ChatBox;
