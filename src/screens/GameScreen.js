import React from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";
import { Container, Typography } from "@material-ui/core";
import Game from "../components/game/Game";
import Footer from "../components/Footer";

const GameScreen = () => {
  const { name } = useParams();
  return (
    <React.Fragment>
      <Navbar />
      <Container style={{ paddingBottom: "20px" }}>
        <Game name={name} />
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default GameScreen;
