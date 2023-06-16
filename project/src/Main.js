import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "./Config";
import Grid from "./GridCards.js";
import "./nomalize.css";
import TopNav from "./TopNav.js";
import './TopNav.css'
import LoginForm from "./LoginForm.js"
import Movie from "./routes/Movie";
import AccountDetail from "./AccountDetail";

function Main() {
 
  return (
    <div>
      <TopNav></TopNav>
      
      <Grid></Grid>
      <Movie></Movie>
      
    </div>
  );
}

export default Main;
