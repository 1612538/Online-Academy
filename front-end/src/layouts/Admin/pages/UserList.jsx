import { Box, Container } from "@material-ui/core";
import UserListResults from "../../../components/Admin/User/UserListResults";
import UserListToolbar from "../../../components/Admin/User/UserListToolbar";

const UserList = () => (
  <>
    <Box>
      <Container maxWidth={false}>
        <UserListToolbar />
        <Box style={{ paddingTop: 30 }}>
          <UserListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default UserList;
