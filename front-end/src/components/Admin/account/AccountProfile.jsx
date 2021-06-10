import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const user = {
  avatar: "",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};
const useStyles = makeStyles({
  text: {
    fontWeight: "bold",
  },
});

const AccountProfile = (props) => {
  const classes = useStyles();
  return (
    <Card {...props}>
      <CardContent style={{ textAlign: "center" }}>
        <Box
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.avatar}
            style={{
              height: 100,
              width: 100,
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
            className={classes.text}
          >
            {user.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          className={classes.text}
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
