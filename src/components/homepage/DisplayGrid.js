import React from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import {connect} from "react-redux"
import GameCard from "./GameCard";
const DisplayGrid = ({state}) => {
  let language = state.user.language
  let games = [
    {
      name: language === "English" ? "Nouns Game" : "Chinese",
      id:"nouns",
      details: "Game to improve your nouns. Many categories available",
      imageUrl:
        "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?cs=srgb&dl=pexels-lalesh-aldarwish-194511.jpg&fm=jpg",
    },
    {
      name: "Sentence Builder",
      id:"sentences",
      details:
        "Game to improve your sentence structure. Many categories available",
      imageUrl:
        "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?cs=srgb&dl=pexels-lalesh-aldarwish-194511.jpg&fm=jpg",
    },
    {
      name: "Spelling",
      id:"spelling",
      details: "Game to improve your spelling. Many categories available",
      imageUrl:
        "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?cs=srgb&dl=pexels-lalesh-aldarwish-194511.jpg&fm=jpg",
    },
  ];
  return (
    <Container>
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item key={game.id} xs={12} md={6}>
            <GameCard name={game.name} details={game.details} imageUrl={game.imageUrl} link={game.id}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default connect(
  (state) => ({ state: state }),
  null
)(DisplayGrid);
