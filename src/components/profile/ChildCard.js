import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_CHILD } from "../../redux/user/user.types";
import { capitalize } from "../utils/capitalize";
import { removeChild } from "../../redux/API/API.actions";
import { resetSelectedChild } from "../../redux/user/user.actions";

const useStyles = makeStyles((theme) => {
  return {
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

const ChildCard = ({ name }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleOpen = (e) => {
    e.stopPropagation()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    if (state.user.selectedChild === name) {
      dispatch(resetSelectedChild());
    }
    dispatch(removeChild(name));
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
    dispatch({ type: SET_SELECTED_CHILD, payload: name });
  };

  return (
    <React.Fragment>
      <Card>
        <CardActionArea onClick={handleCardClick}>
          <CardContent
            className={
              state.user.selectedChild === name ? classes.active : classes.card
            }
          >
            <Typography align="center" variant="h4">
              {capitalize(name)}
            </Typography>
            <Button onClick={handleOpen}>Delete</Button>
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ChildCard;
