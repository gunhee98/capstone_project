import "./TopNav.css";
import "./nomalize.css";
import "./LoginForm"
import React, { useEffect, useState, useRef } from "react";
import LoginsForm from "./LoginForm"

function TopNav() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <div className='nav-container'>
      <nav
        className={
          scrollPosition > 100 ? "nav-scrooled" : "nav-scrooled-reverse"
        }
      >
        
        <ul>
          <li>Home</li>
          <li>Movie</li>
          <li>Favorite</li>
          <li className="login-link" onClick={handleLoginClick}>
            Login
          </li>

        </ul>
          
      </nav>
      {showModal && (
        <div className="modal-overlay" >
          
          <LoginsForm closeModal={closeModal} />
        </div>)}
    </div>
  );
}

export default TopNav;
