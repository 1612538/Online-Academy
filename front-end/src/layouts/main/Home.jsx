import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader"
import PageBody from "../../components/PageBody/HomeBody/HomeBody"
import {makeStyles} from '@material-ui/core/styles';
import BackgroundImage from '../../assets/background.jpg';
import "@fontsource/roboto";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        width:'100%',
        height:'100vh',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundColor: `rgba(1,11,46)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        zIndex: '-1',
    },
  }));

function Home() {
    const classes = useStyles();
    return (
        <div>
        <div className={classes.root}></div>
        <PageHeader>
            
        </PageHeader>
        <PageBody>

        </PageBody>
        </div>
    );
}

export default Home;