import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Container,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import AverageScoresByGame from "./AverageScoresByGame";
import RecentList from "./RecentList";

const useStyles = makeStyles((theme) => {
  return {
    button: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    buttonContainer: {
      marginTop: "20px",
    },
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

const AnalyticsGrid = () => {
  const state = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [gameType, setGameType] = useState("");
  const classes = useStyles();

  const getUniqueGameNames = () => {
    const gameNames = [
      ...new Set(state.profile.averageScoresByGame.map((a) => a.game_name)),
    ];
    return gameNames;
  };
  useEffect(() => {
    setLoading(false);
    setGameType(getUniqueGameNames()[0]);
  }, [state.profile]);

  return (
    <Container style={{ padding: "30px 0px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography variant="h3" align="center">
            Average scores for each game
          </Typography>
          <Grid container className={classes.buttonContainer}>
            {loading
              ? "Loading"
              : getUniqueGameNames().map((a) => {
                  return (
                    <Grid item xs={4} className={classes.button}>
                      <Button
                        onClick={() => setGameType(a)}
                        className={
                          a === gameType ? classes.active : classes.card
                        }
                        variant="contained"
                        colod="primary"
                      >
                        {a}
                      </Button>
                    </Grid>
                  );
                })}
          </Grid>
          <AverageScoresByGame
            child={state.user.selectedChild}
            game={gameType}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h3" align="center">
            Recent scores
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <RecentList
            game={gameType}
            child={state.user.selectedChild}
            data={state.profile.recentScores}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalyticsGrid;
