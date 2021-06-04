import React, { useEffect, useState } from "react";

import PageHeader from "../../components/PageHeader/PageHeader";
import CourseLecture from "../../components/PageBody/CourseBody/CourseLecture";

const CourseLectures = (props) => {
  return (
    <div>
      <PageHeader></PageHeader>
      <CourseLecture match={props.match}></CourseLecture>
    </div>
  );
};

export default CourseLectures;
