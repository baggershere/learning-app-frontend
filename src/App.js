import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import "./index.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useCookies } from "react-cookie";
import { purple } from "@material-ui/core/colors";
import { connect, useDispatch, useSelector } from "react-redux";
import { setUserState } from "./redux/user/user.actions";
import { useEffect } from "react";
import GameScreen from "./screens/GameScreen";
import Footer from "./components/Footer";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#EDC7B7",
    },
    secondary: {
      main: "#EEE2DC",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    h3: {
      fontSize: "1.6rem",
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
    },
  },
});

function App({ state, setUserState }) {
  const [cookies, setCookies] = useCookies(["authorization"]);

  useEffect(() => {
    setUserState();
  }, []);

  if (state.user.loading) {
    return <h1>LOADING</h1>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/game/:name" component={GameScreen} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default connect(
  (state) => ({ state: state }),
  (dispatch) => ({
    setUserState: () => dispatch(setUserState()),
  })
)(App);
