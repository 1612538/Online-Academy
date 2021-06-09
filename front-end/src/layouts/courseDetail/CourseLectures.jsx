import React, { useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader/PageHeader";
import CourseLecture from "../../components/PageBody/CourseBody/CourseLecture";
import ChatBox from "../../components/ChatBot/ChatBox";

const CourseLectures = (props) => {
  return (
    <div>
      <PageHeader></PageHeader>
      <CourseLecture match={props.match}></CourseLecture>
      <ChatBox></ChatBox>
    </div>
  );
};

export default CourseLectures;
