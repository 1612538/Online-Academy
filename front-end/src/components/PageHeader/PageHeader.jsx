import React from "react";
import {NavBar} from "../NavBar/NavBar"
import Container from "@material-ui/core/Container"
import HeaderImage from "../../assets/header.png";

const PageHeader = () => {
        return (
        <div>
            <NavBar>
            </NavBar>
            <Container maxWidth='xl' style={{padding: 0}}>
            <img style={{boxShadow: '0 4px 6px 0px rgba(0,0,0,0.8)'}} src={HeaderImage} width="100%"></img>
            </Container>
        </div>
        );
}

export default PageHeader;