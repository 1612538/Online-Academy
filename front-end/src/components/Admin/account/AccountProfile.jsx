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
            src={props.admin ? props.admin.img : ""}
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
            {props.admin
              ? props.admin.firstname + " " + props.admin.lastname
              : ""}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${props.admin ? props.admin.occupation : ""}`}
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
