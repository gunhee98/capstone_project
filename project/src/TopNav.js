
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import LoginsForm from "./LoginForm";

function TopNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

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
        console.log("로그아웃 되었습니다.");
      })
      .catch((error) => {
        console.log("로그아웃 오류:", error);
      });
  };

  const handleDisplayNameClick = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <div className="nav-container">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movie">Movie</Link>
          </li>
          {isLoggedIn ? (
            <li className="login-link" onClick={handleDisplayNameClick}>
              {isLoggedIn && userDisplayName ? `${userDisplayName}님` : ""}
              {showSubMenu && (
                <ul className="sub-menu">
                  <li>
                    <Link to="/Account">계정 탈퇴</Link>
                  </li>
                </ul>
              )}
              <li className="login-link" onClick={handleLogout}>Logout</li>
            </li>
          ) : (
            <li className="login-link" onClick={handleLoginClick}>
              Login
            </li>
          )}

        </ul>
      </nav>
      {showModal && (
        <div className="modal-overlay">
          <LoginsForm closeModal={closeModal} setIsLoggedIn={setIsLoggedIn} setUserDisplayName={setUserDisplayName} />
        </div>
      )}
    </div>
  );
}

export default TopNav;
