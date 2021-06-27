import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from "video-react";
import { useState, useEffect } from "react";

import axios from "axios";

const Accordion = withStyles({
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const useStyles = makeStyles((theme) => ({
  customText2: {
    margin: "10px 20px 5px 20px",
  },
}));

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "transparent",
    borderBottom: "1px solid rgba(0, 0, 0, .3)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions({ idcourse }) {
  const [expanded, setExpanded] = useState("panel0");
  const [lectures, setLectures] = useState([]);
  const classes = useStyles();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const getLectures = async () => {
    const data = await axios.get(
      `http://localhost:8080/api/courselectures/${idcourse}`
    );

    if (data.data.length > 0) setLectures(data.data);
    else setLectures([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getLectures();
    };
    fetchData();
    return () => {
      setLectures([]);
    };
  }, [idcourse]);

  return (
    <div style={{ marginLeft: 20, marginBottom: 20 }}>
      {lectures.length > 0 ? (
        lectures.map((lecture, key) => (
          <Accordion
            square
            key={key}
            expanded={expanded === "panel" + key.toString()}
            onChange={handleChange("panel" + key.toString())}
          >
            <AccordionSummary
              aria-controls={"panel" + key.toString() + "d-content"}
              id={"panel" + key.toString() + "d-header"}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography style={{ fontWeight: "bold" }}>
                {lecture.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container direction="column">
                <Player key={lecture.idlecture}>
                  <source src={"http://localhost:8080" + lecture.video} />
                  <ControlBar autoHide>
                    <ReplayControl seconds={10} order={1.1} />
                    <ForwardControl seconds={30} order={1.2} />
                    <CurrentTimeDisplay order={4.1} />
                    <TimeDivider order={4.2} />
                    <PlaybackRateMenuButton
                      rates={[2, 1, 0.5, 0.1]}
                      order={7.1}
                    />
                    <VolumeMenuButton order={7.2} />
                  </ControlBar>
                </Player>
                <Typography
                  variant="body1"
                  className={classes.customText2}
                  key={Date()}
                  dangerouslySetInnerHTML={{ __html: lecture.description }}
                ></Typography>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <>
          <Typography variant="h6">
            This course hasn't have any lecture yet. Please come back later
          </Typography>
        </>
      )}
    </div>
  );
}
