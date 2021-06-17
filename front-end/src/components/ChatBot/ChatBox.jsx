import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
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

const ChatBox = () => {
  const [categories, setCategories] = useState([]);
  const catOption = [];

  const getSmallCategories = () => {
    axios
      .get(`http://localhost:8080/api/smallcategories`)
      .then((res) => {
        const smallcats = res.data;
        setCategories(smallcats);
        for (let obj of res.data)
          catOption.push({
            value: obj.idsmall_category,
            label: obj.name,
            trigger: "1",
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSmallCategories();
  }, []);

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
            options: catOption,
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
