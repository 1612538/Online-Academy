import { Grid, Container, Typography, Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LogoutIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "6vh",
    backgroundColor: "rgb(30, 136, 229)",
    color: "white",
    position: "fixed",
    top: "0",
    zIndex: "2",
  },
  customText: {
    textAlign: "center",
    padding: "10px",
  },
  customButton: {
    height: "6vh",
    padding: "10px",
    color: "white",
    borderRadius: "0",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="row-reverse">
        <Grid item>
          <Button className={classes.customButton} href="/signout">
            <LogoutIcon fontSize="large"></LogoutIcon>
          </Button>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" item xs style={{ height: "6vh" }}>
            <Link href="/" color="inherit">
              <Typography variant="body1" className={classes.customText}>
                Go to homepage
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default NavBar;
