import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => {
  return {
    footer: {
      padding: "0px",
      backgroundColor: theme.palette.primary.main,
    },
    text: {
      color: "black",
      textDecoration: "none",
      "&:hover": {
          color: "white"
      }
    },
  };
});

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Box>
        <Container style={{padding:"30px"}} maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box display="flex" justifyContent="center">
                <Typography>
                  <Link to="/" className={classes.text}>
                    Home
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" justifyContent="center">
                <Typography>
                  <Link to="/profile" className={classes.text}>
                    Profile
                  </Link>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display="flex" justifyContent="center">
              <Typography>
                  <Link to="/" className={classes.text}>
                    Learning Activities
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
