import { useState } from "react";
import { Box, Container } from "@material-ui/core";
import TeacherListResults from "../../../components/Admin/Teacher/TeacherListResults";
import TeacherListToolbar from "../../../components/Admin/Teacher/TeacherListToolbar";

const TeacherList = () => {
  const [update, setUpdate] = useState(false);
  return (
    <>
      <Box>
        <Container maxWidth={false}>
          <TeacherListToolbar setUpdate={setUpdate} update={update} />
          <Box style={{ paddingTop: 30 }}>
            <TeacherListResults update={update} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default TeacherList;
