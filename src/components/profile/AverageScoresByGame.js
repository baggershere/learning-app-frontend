import React, { useEffect, useState } from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => {
  return {
    card: {
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
    active: {
      background: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  };
});

const AverageScoresByGame = ({ game, child, state }) => {
  const classes = useStyles();
  const [currentStudentData, setCurrentStudentData] = useState("");
  const [currentAverageData, setCurrentAverageData] = useState("");

  const extractStudentScores = () => {
    const scores = state.profile.averageScoresByGame;

    const score = scores.filter(
      (item) => item["game_name"] === game && item["child_name"] === child
    );
    if (score[0]) {
      setCurrentStudentData(parseInt(score[0].avg).toFixed(0));
    } else {
      setCurrentStudentData("No data available, please select a child");
    }
  };

  const extractAverageScores = () => {
    const scores = state.profile.averageOverallScores;

    const score = scores.filter((item) => item["game_name"] === game);
    if (score[0]) {
      setCurrentAverageData(parseInt(score[0].avg).toFixed(0));
    } else {
      setCurrentAverageData("No data available, please select a child");
    }
  };

  React.useEffect(() => {
    if (!state.profile.loading) {
      extractStudentScores();
      extractAverageScores();
    }
  }, [state, game, child]);

  return (
    <Container style={{padding: "40px 0px"}}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h3" align="center">
            Your score
          </Typography>
          <Typography variant="h3" align="center">
            {currentStudentData}%
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3" align="center">
            Student average
          </Typography>
          <Typography variant="h3" align="center">
            {currentAverageData}%
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default connect(state => ({
  state: state
}), null)(AverageScoresByGame);
