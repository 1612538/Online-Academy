import { Box, Container } from "@material-ui/core";
import CustomerListResults from "../../../components/Admin/User/UserListResults";
import CustomerListToolbar from "../../../components/Admin/User/UserListToolbar";

const customers = [];

const CustomerList = () => (
  <>
    <Box>
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box style={{ paddingTop: 30 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default CustomerList;
