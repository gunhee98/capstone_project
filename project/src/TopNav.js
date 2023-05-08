import "./TopNav.css";
import "./nomalize.css";
import React, { useEffect, useState, useRef } from "react";

function TopNav() {

  const [scrollPosition, setScrollPosition] = useState(0);


  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);

  return (
    <nav className={scrollPosition > 100 ? "nav-scrooled" : "nav-scrooled-reverse"} >
      <ul>
        <li>Home</li>
        <li>Movie</li>
        <li>Favorite</li>
      </ul>
    </nav>
    
  );
}

export default TopNav;
