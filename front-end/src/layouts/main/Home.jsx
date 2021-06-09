import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import PageBody from "../../components/PageBody/HomeBody/HomeBody";
import ChatBox from "../../components/ChatBot/ChatBox";

const Home = () => {
  return (
    <div>
      <PageHeader></PageHeader>
      <PageBody></PageBody>
      <ChatBox></ChatBox>
    </div>
  );
};

export default Home;
