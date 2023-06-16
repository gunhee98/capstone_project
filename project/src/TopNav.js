import "./TopNav.css";
import "./nomalize.css";
import "./LoginForm";
import React, { useEffect, useState } from "react";
import LoginsForm from "./LoginForm";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Movie from "./routes/Movie";

function TopNav() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
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
  const handleDisplayNameClick = () => {
    setShowSubMenu(!showSubMenu); // 새로운 메뉴 표시 상태를 변경하여 토글
  };
  return (
    <div className="nav-container">
      <nav
        className={
          scrollPosition > 100 ? "nav-scrooled" : "nav-scrooled-reverse"
        }
      >
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movie">Movie</Link></li>
          {isLoggedIn ? (
            <li className="login-link" onClick={handleDisplayNameClick}>
              {userDisplayName ? `${userDisplayName}님` : ""}
              {showSubMenu && (
                <ul className="sub-menu">
                  {/* 추가적인 서브 메뉴 아이템들 */}
                  <li><Link to="/Account">계정 탈퇴</Link></li>
                </ul>
              )}
            </li>
          ) : (
            <li className="login-link" onClick={handleLoginClick}>
              Login
            </li>
          )} : 
          {!showModal && isLoggedIn && <li onClick={handleLogout}>Logout</li>}
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
