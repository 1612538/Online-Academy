import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "../../../components/Admin/account/AccountProfile";
import AccountProfileDetails from "../../../components/Admin/account/AccountProfileDetails";

const Account = ({ admin }) => (
  <>
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile admin={admin} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails admin={admin} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Account;
