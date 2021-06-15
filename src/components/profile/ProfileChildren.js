import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  Button,
  IconButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";
import { capitalize } from "../utils/capitalize";
import ChildCard from "./ChildCard";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import setCookie from "../utils/setCookie";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addChild } from "../../redux/API/API.actions";

const useStyles = makeStyles((theme) => {
  return {
    header: {
      margin: "20px 0",
    },
    button: {
      marginTop: theme.spacing(3),
    },
    center: {
      display: "flex",
      justifyContent: "center",
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

const ProfileChildren = ({ children }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleClose = () => {
    setOpen(false);
    setError("");
    setName("");
  };

  const handleSubmit = () => {
    if (name.length > 0 && !state.profile.children.includes(name)) {
      dispatch(addChild(name));
      setOpen(false);
      setName("")
    }
    if (state.profile.children.includes(name))
      setError("This child already exists");
    if (name.length === 0) {
      setError("Please enter a name");
    }
  };

  return (
    <Container>
      <Typography className={classes.header} align="center" variant="h3">
        's Profile
      </Typography>
      <Grid container spacing={3}>
        {children.map((child) => {
          return (
            <Grid item xs={6} md={4}>
              <ChildCard name={child} />
            </Grid>
          );
        })}
      </Grid>
      <Container className={classes.center}>
        <Button
          onClick={() => setOpen(true)}
          className={classes.button}
          variant="contained"
          color="primary"
          endIcon={<AddCircleIcon>send</AddCircleIcon>}
        >
          Add child
        </Button>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            onChange={(e) => setName(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <Typography>{error.length ? error : ""}</Typography>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfileChildren;