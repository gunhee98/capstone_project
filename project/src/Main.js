import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "./Config";
import Grid from "./GridCards.js";
import "./nomalize.css";
import TopNav from "./TopNav.js";
import './TopNav.css'
import LoginForm from "./LoginForm.js"
function Main() {
  return (
    <div>
      <TopNav></TopNav>
      
      <Grid></Grid>
      <LoginForm></LoginForm>
      <div className="box"></div>
    </div>
  );
}

export default Main;
