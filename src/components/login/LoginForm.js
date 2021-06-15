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
import store from "../../redux/store";
import AcUnitOutlinedIcon from "@material-ui/icons/AcUnitOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import setCookie from "../utils/setCookie";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector, connect } from "react-redux";
import { login, resetSelectedChild } from "../../redux/user/user.actions";
import { resetState } from "../../redux/signup/signup.actions";

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

const LoginForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies(["authorization"]);
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (state.user.isAuth) {
      history.push("/profile");
    }
  }, [state]);

  if (state.user.loadingLogin) {
    return <h1>LOGIN LOGIN</h1>;
  } else {
    return (
      <Container>
        <CssBaseline />
        <div className={classes.form_container}>
          <LockIcon />
          <Typography variant="h3">Login</Typography>
          <Typography variant="h3">
            {state.user.loading ? "LOADING" : ""}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
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
                {state.user.error && state.user.error}
              </Typography>
            </Container>
            <Button
              onClick={(e) => handleSubmit(e)}
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
                <Link to="/signup">Don't have an account? Sign up here</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
};

export default LoginForm;

// await axios
//   .post(
//     "http://localhost:5000/api/login",
//     {
//       email,
//       password,
//     },
//     { withCredentials: true }
//   )
//   .then((resp) => {
//     setCookie(resp.data.accessToken);
//     const children = resp.data.data.children;
//     console.log(children);
//     dispatch(setChildren(children))
//     dispatch(setChild(children[0]))
//     //history.push("/profile");
//   })
//   .catch((e) => {
//     console.log(e);
//     setError(e.response.data.message);
//   });
