import "./TopNav.css";
import "./nomalize.css";
import "./LoginForm";
import React, { useEffect, useState } from "react";
import LoginsForm from "./LoginForm";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function TopNav() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user ? true : false);
      if (user) {
        setUserDisplayName(user.displayName);
      } else {
        setUserDisplayName("");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // 로그아웃 성공
        console.log("로그아웃 되었습니다.");
        // 추가 작업 수행
      })
      .catch((error) => {
        // 로그아웃 실패 처리
        console.log("로그아웃 오류:", error);
      });
  };

  return (
    <div className="nav-container">
      <nav
        className={
          scrollPosition > 100 ? "nav-scrooled" : "nav-scrooled-reverse"
        }
      >
        <ul>
          <li>Home</li>
          <li>Movie</li>
          {isLoggedIn ? (
            <li style={{ cursor: 'auto' }} className="login-link">
              {userDisplayName ? (
                `${userDisplayName}님`
              ) : (
                ""
              )}
            </li>
          ) : (
            <li className="login-link" onClick={handleLoginClick}>
              Login
            </li>
          )}
          {isLoggedIn && (
            <li onClick={handleLogout}>
              Logout
            </li>
          )}
        </ul>
      </nav>
      {showModal && (
        <div className="modal-overlay">
          <LoginsForm closeModal={closeModal} />
        </div>
      )}
    </div>
  );
}

export default TopNav;
