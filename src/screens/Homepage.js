import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import GameList from "../components/homepage/GameList";
import store from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
const Homepage = () => {
    const dispatch = useDispatch()
    
  return (
    <div>
      <Navbar />
      <GameList />
    </div>
  );
};

  
  export default Homepage
