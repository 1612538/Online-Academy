import { Box, Container } from "@material-ui/core";
import CourseListResults from "../../../components/Admin/Course/CourseListResults";
import CourseListToolbar from "../../../components/Admin/Course/CourseListToolbar";

const UserList = () => (
  <>
    <Box>
      <Container maxWidth={false}>
        <CourseListToolbar />
        <Box style={{ paddingTop: 30 }}>
          <CourseListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default UserList;
