import React from "react";
import { NavBar } from "../NavBar/NavBar";
import Container from "@material-ui/core/Container";
import Carousel from "./Carousel";

const PageHeader = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Container
        maxWidth="xl"
        style={{
          padding: 0,
          boxShadow: "0 4px 6px 0px rgba(0,0,0,0.8)",
        }}
      >
        <Carousel></Carousel>
      </Container>
    </div>
  );
};

export default PageHeader;
