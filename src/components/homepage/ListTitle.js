import React from "react";
import { Typography, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    padding: "10px 0px",
  },
});

const ListTitle = () => {
  const classes = useStyles();
  return (
    <Container>
      <Typography className={classes.title} variant="h3" align="center">
        Learning activities
      </Typography>
    </Container>
  );
};

export default ListTitle;
