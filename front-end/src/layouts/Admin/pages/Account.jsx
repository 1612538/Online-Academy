import { Box, Container, Grid } from "@material-ui/core";
import AccountProfile from "../../../components/Admin/account/AccountProfile";
import AccountProfileDetails from "../../../components/Admin/account/AccountProfileDetails";

const Account = () => (
  <>
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Account;
