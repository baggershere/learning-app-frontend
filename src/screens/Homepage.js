import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import GameList from "../components/homepage/GameList";
import store from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import Footer from "../components/Footer";
const Homepage = () => {
    const dispatch = useDispatch()
    
  return (
    <div style={{minHeight: "100vh", display:"grid",  gridTemplateRows: "auto 1fr auto"}}>
      <Navbar />
      <GameList />
      <Footer/>
    </div>
  );
};

  
  export default Homepage
