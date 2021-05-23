import React, {Component} from "react";
import {NavBar} from "../NavBar/NavBar"
import Container from "@material-ui/core/Container"
import HeaderImage from "../../assets/header.png";

class PageHeader extends Component {
    render() {
        return (
        <div>
            <NavBar>
            </NavBar>
            <Container maxWidth='xl' style={{padding: 0}}>
            <img src={HeaderImage} width="100%"></img>
            </Container>
        </div>
        );
    }
}

export default PageHeader;