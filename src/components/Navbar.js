import React, { useState } from "react";
import PropTypes from 'prop-types'
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { resetUserState } from "../redux/user/user.actions";
import { connect } from "react-redux";

const useStyles = makeStyles(() => {
  return {
    title: {
      flexGrow: 1,
    },
    list: {
      width: "50vw",
      minWidth: "200px",
      maxWidth: "300px",
    },
    button: {
      fontSize: "25px",
      textTransform: "none",
    },
  };
});
const Navbar = ({ state, resetUserState }) => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["authorization"]);
  const history = useHistory();

  const handleLogout = () => {
    console.log("logout btn");
    resetUserState();
    removeCookie("authorization");
    history.push("/");
  };

  return (
    <div data-test="rootDiv">
      <AppBar data-test="appbarComponent" position="static">
        <Toolbar>
          <IconButton>
            <MenuIcon data-test="drawerButton" onClick={() => setDrawer(true)} />
          </IconButton>
          <Typography
            data-test="navbarTitle"
            className={classes.title}
            variant="h6"
          >
            Hi NAME HERE
          </Typography>
          {state.user.isAuth ? (
            <Button onClick={handleLogout}>Log out</Button>
          ) : null}
          {!state.user.isAuth ? (
            <Button onClick={() => history.push("/signup")}>Sign up</Button>
          ) : null}
          {!state.user.isAuth ? (
            <Button onClick={() => history.push("/login")}>Sign in</Button>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer
        data-test="drawer"
        className="drawerComponent"
        anchor="left"
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        <List data-test="drawerItems" className={classes.list}>
          <ListItem>
            <Typography align="justify" variant="h4">
              Hello
            </Typography>
          </ListItem>
          <ListItem>
            <Button className={classes.button} fullWidth>
              <Link to="/">Home</Link>
            </Button>
          </ListItem>
          <ListItem>
            <Button className={classes.button} fullWidth>
              <Link to="/login">Login</Link>
            </Button>
          </ListItem>
          <ListItem>
            <Button className={classes.button} fullWidth>
              <Link to="/profile">Profile</Link>
            </Button>
          </ListItem>
          <ListItem>
            <Button className={classes.button} fullWidth>
              <Link to="/">Home</Link>
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};


Navbar.propTypes = {
  state: PropTypes.object,
  resetUserState: PropTypes.func
}


export default connect(
  (state) => ({ state: state }),
  (dispatch) => ({ resetUserState: () => dispatch(resetUserState()) })
)(Navbar);
