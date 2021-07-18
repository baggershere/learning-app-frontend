import React from "react";
import { Container, Grid, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import GameCard from "./GameCard";
const DisplayGrid = ({ state }) => {
  let language = state.user.language;
  let games = [
    {
      name: language === "English" ? "Nouns Game" : "名词乐园",
      id: "nouns",
      details:
        language === "English"
          ? "A game to improve your vocabulary. Many categories available"
          : "在不同的场景下，提高你的词汇量水平",
      imageUrl:
        "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?cs=srgb&dl=pexels-lalesh-aldarwish-194511.jpg&fm=jpg",
    },
    {
      name: language === "English" ? "Sentence builder" : "造句",
      id: "sentences",
      details:
      language === "English"
      ? "A game to improve your sentence structure. Many categories available"
      : "在不同的场景下，提高你的造句能力",
      imageUrl:
        "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?cs=srgb&dl=pexels-lalesh-aldarwish-194511.jpg&fm=jpg",
    },
    {
      name: language === "English" ? "Spelling" : "拼写",
      id: "spelling",
      details: language === "English"
      ? "A game to improve your spelling. Many categories available"
      : "在不同的场景下，提高你的拼写能力",
      imageUrl:
        "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?cs=srgb&dl=pexels-lalesh-aldarwish-194511.jpg&fm=jpg",
    },
    {
      name: language === "English" ? "Questions" : "问题",
      id: "questions",
      details: language === "English"
      ? "A game to improve your ability to ask questions."
      : "提高你的问问题能力",
      imageUrl:
        "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?cs=srgb&dl=pexels-lalesh-aldarwish-194511.jpg&fm=jpg",
    },
  ];
  return (
    <Container>
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item key={game.id} xs={12} md={6}>
            <GameCard
              name={game.name}
              details={game.details}
              imageUrl={game.imageUrl}
              link={game.id}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default connect((state) => ({ state: state }), null)(DisplayGrid);
