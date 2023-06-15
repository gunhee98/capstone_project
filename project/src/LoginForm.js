import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { auth } from "./firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  updateProfile, setPersistence, browserLocalPersistence } from "firebase/auth";

import "./LoginForm.css";

function LoginsForm({ closeModal }) {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth();

    if (signup === true) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        
        alert("회원가입에 성공하였습니다.");
        setEmail("");
        setPassword("");
        setName("");
      })
      .catch((error) => {
        alert("회원가입에 실패하였습니다.");
      });
    }
    else {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 로그인 성공
        const user = userCredential.user;
        console.log(user);
        alert("로그인에 성공하였습니다.");
        setEmail("");
        setPassword("");
        setName("");
        closeModal();
      })
      .catch((error) => {
        
        alert("로그인에 실패하였습니다.");
      });
    }

  };

  return (
    <div className="card-container">
       <h3 className="close"type="button" onClick={closeModal}>
          닫기
        </h3>
      <div className="wrap flex">
        <div className="white">
          <div>
            <h2>영화 정보 사이트</h2>
            <hr></hr>
          </div>

          <span>
            영화에 대해 정보를 더 알고 싶으시면 로그인을 해주세요.
          </span>
        </div>
        <div className="white">
          <div className="tab flex">
            <h3 onClick={()=> {
              setSignup(false);
            }}>Login</h3>
            <h3 onClick={()=> {
              setSignup(true);
            }}>SignUp</h3>
          </div>
          
          <div>
            <form onSubmit={handleSubmit}>
              <>
                {signup===true ? <label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="name"
                />
              </label> : null}
              </>
            
              <label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="email"
                />
              </label>
              <label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="password"
                />
              </label>
              
              <>
                {signup===true ? <button type="submit">회원가입</button> : <button type="submit">로그인</button>}
              </>
              
            </form>
          </div>
        </div>
      </div>
      {/* <div className="left"></div>
      <div className="left loginForm">
        <div className="flex ">
          <div className="left">
            <span>Login</span>
          </div>
          <div className="left">
            <span>Sign up</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            
            <input type="email" value={email} onChange={handleEmailChange} placeholder="email"/>
          </label>
          <label>
            
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="password"
            />
          </label>
          <button type="submit">로그인</button>
        </form>
      </div> */}
    </div>
  );
}

export default LoginsForm;

