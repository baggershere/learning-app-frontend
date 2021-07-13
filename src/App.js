import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homepage from "./screens/Homepage";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import "./index.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useCookies } from "react-cookie";
import { purple } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "./redux/user/user.actions";
import { useEffect } from "react";
import GameScreen from "./screens/GameScreen";

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

function App() {
  const [cookies, setCookies] = useCookies(["authorization"]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(setUserState());
  }, []);

  // useEffect(() => {
  //   if (cookies.authorization && cookies.authorization.length) {
  //     // let jwt = cookies.authorization.split(" ")[1];
  //     // const data = JSON.parse(atob(jwt.split(".")[1]));
  //     const data = cookies.authorization;
  //     const decoded = JSON.parse(atob(data.split(".")[1]));
  //     console.log(decoded)
  //     dispatch(setUserState(decoded))
  //   }
  // }, []);
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

export default App;
