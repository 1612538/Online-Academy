import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import "../../assets/chatbox.css";

function ChatBox() {
  useEffect(() => {
    addResponseMessage("Hello! How can I help you?");
  }, []);
  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    addResponseMessage("Please wait a moment!");
  };
  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Online Academy"
        subtitle="User Supports"
      />
    </div>
  );
}

export default ChatBox;
