import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "./Config";
import Grid from "./GridCards.js";
import "./nomalize.css";
import TopNav from "./TopNav.js";

function Main() {
  return (
    <div>
      {/* <TopNav></TopNav> */}
      <Grid></Grid>
    </div>
  );
}

export default Main;
