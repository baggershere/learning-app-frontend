import React, { useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useCookies} from "react-cookie"
import {resetUserState} from "../redux/user/user.actions"

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
        fontSize:'25px',
        textTransform: 'none'
    }
  };
});
const Navbar = () => {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const state = useSelector(state=>state)
  const [cookie, setCookie, removeCookie] = useCookies(['authorization'])
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    console.log('logout btn')
    dispatch(resetUserState())
    removeCookie('authorization')
    history.push('/')
  }

  return (
    <div>
      <AppBar className="appbarComponent" position="static">
        <Toolbar>
          <IconButton>
            <MenuIcon onClick={() => setDrawer(true)} />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            Hi NAME HERE
          </Typography>
          {state.user.isAuth ? <Button onClick={handleLogout}>Log out</Button> : null}
          {!state.user.isAuth ? <Button onClick={() => history.push('/signup')}>Sign up</Button> : null}
          {!state.user.isAuth ? <Button onClick={() => history.push('/login')}>Sign in</Button> : null}
        </Toolbar>
      </AppBar>
      <Drawer className="drawerComponent" anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <List className={classes.list}>
          <ListItem>
            <Typography align='justify' variant="h4">Hello</Typography>
          </ListItem>
          <ListItem>
            <Button className={classes.button} fullWidth><Link to="/">Home</Link></Button>
          </ListItem>
          <ListItem>
            <Button className={classes.button} fullWidth><Link to="/login">Login</Link></Button>
          </ListItem>
          <ListItem>
            <Button className={classes.button} fullWidth><Link to="/profile">Profile</Link></Button>
          </ListItem>
          <ListItem>
            <Button className={classes.button} fullWidth><Link to="/">Home</Link></Button>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
