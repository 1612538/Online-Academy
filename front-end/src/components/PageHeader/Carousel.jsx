import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header1 from "../../assets/header1.png";
import Header2 from "../../assets/header2.jpg";
import Header3 from "../../assets/header3.jpg";
import Header4 from "../../assets/header4.jpg";
const myCarousel = (props) => {
  var items = [
    {
      imgURL: Header1,
    },
    {
      imgURL: Header2,
    },
    {
      imgURL: Header3,
    },
    {
      imgURL: Header4,
    },
  ];

  return (
    <Carousel interval={3000} animation="slide" indicators={false}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

function Item(props) {
  const useStyles = makeStyles({
    image: {
      marginTop: "-20px",
      width: "100%",
      height: "500px",
      backgroundImage: `url(${props.item.imgURL})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  });
  const classes = useStyles();
  return (
    <Paper style={{ borderRadius: "0px" }}>
      <div className={classes.image}></div>
    </Paper>
  );
}

export default myCarousel;
