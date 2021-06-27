import { Box, Container } from "@material-ui/core";
import { useState } from "react";
import CourseListResults from "../../../components/Admin/Course/CourseListResults";
import CourseListToolbar from "../../../components/Admin/Course/CourseListToolbar";

const CourseList = () => {
  const [courseName, setName] = useState("");
  const [teacherName, setTeacher] = useState("");
  return (
    <>
      <Box>
        <Container maxWidth={false}>
          <CourseListToolbar setName={setName} setTeacher={setTeacher} />
          <Box style={{ paddingTop: 30 }}>
            <CourseListResults cname={courseName} tname={teacherName} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CourseList;
