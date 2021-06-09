import React, { useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader/PageHeader";
import CourseBody from "../../components/PageBody/CourseBody/CourseBody";
import ChatBox from "../../components/ChatBot/ChatBox";

const CourseDetail = (props) => {
  return (
    <div>
      <PageHeader></PageHeader>
      <CourseBody match={props.match}></CourseBody>
      <ChatBox></ChatBox>
    </div>
  );
};

export default CourseDetail;
