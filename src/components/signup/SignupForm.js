import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  ButtonGroup,
  Container,
  TextField,
  Radio,
  radioGroup,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CssBaseline,
  Grid,
} from "@material-ui/core";
import AcUnitOutlinedIcon from "@material-ui/icons/AcUnitOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, resetState } from "../../redux/signup/signup.actions";

const useStyles = makeStyles((theme) => ({
  form_container: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    marginTop: theme.spacing(4),
    minWidth: "40%",
  },
  link: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: "15px",
  },
}));
const SignupForm = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupUser(email, name, password));
    console.log();
  };

  useEffect(() => {
    if (state.signup.success === true) {
      dispatch(resetState())
      history.push("/login");
    }
  }, [state.signup]);

  if (state.signup.loading) {
    return <h1>LOADING SIGNUP</h1>;
  } else {
    return (
      <Container>
        <CssBaseline />
        <div className={classes.form_container}>
          <LockIcon />
          <Typography variant="h3">Sign Up</Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setName(e.target.value)}
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  type="password"
                />
              </Grid>
            </Grid>
            <Container>
              <Typography
                variant="h6"
                color="error"
                style={{ marginTop: "10px" }}
              >
                {state.signup.error ? <p>{state.signup.error.message}</p> : ""}
              </Typography>
            </Container>
            <Button
              onClick={handleSubmit}
              className={classes.button}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid className={classes.link} item xs={12}>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
};

export default SignupForm;
