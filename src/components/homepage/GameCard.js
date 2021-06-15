import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  media: {
    height: 300,
  },
});

const GameCard = ({ name, details, imageUrl, link }) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card>
      <CardActionArea onClick={() => history.push("/game/" + link)}>
        <CardMedia className={classes.media} image={imageUrl} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {details}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="large" color="error">
          Play
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameCard;
