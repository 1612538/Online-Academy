import React, {useEffect} from "react";
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        marginTop: '30px',
    },
    customText: {
        width: '90%',
        margin: 'auto',
        fontWeight: 'bold',
        color: 'white',
        borderBottom: '1px solid white',
        paddingBottom: '2px',
        marginBottom:'10px',
    },
  });

function TopNew() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <Typography variant='h4' className={classes.customText}>Top categories</Typography>
        <Grid container justify='center' style={{padding: 20, width: '100%'}}>
        <Grid item>

        </Grid>
        </Grid>
        </div>
    );
}

export default TopNew;