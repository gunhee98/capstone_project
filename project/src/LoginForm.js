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

  const handleSubmitSignUp = (event) => {
    event.preventDefault();
    const auth = getAuth();
  
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
  };
  
  const handleSubmitSignIn = (event) => {
    event.preventDefault();
    const auth = getAuth();
  
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
        
        setPersistence(auth, browserLocalPersistence)
          .then(() => {
            // 로그인 유지 설정이 성공한 경우
            window.location.reload();
          })
          .catch((error) => {
            console.log("로그인 유지 설정 오류:", error);
          });
      })
      .catch((error) => {
        alert("로그인에 실패하였습니다.");
      });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (signup === true) {
      handleSubmitSignUp(event);
    } else {
      handleSubmitSignIn(event);
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
                {signup===true ? <button type="submit">회원가입</button> : <button className ="loginBtn"type="submit">로그인</button>}
              </>
              
            </form>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default LoginsForm;

