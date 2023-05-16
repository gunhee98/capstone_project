import React, { useState, useEffect } from "react";
// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";
// import { auth } from "./firebase";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./LoginForm.css";

function LoginsForm() {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const auth = getAuth();
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // 로그인 성공
    //     const user = userCredential.user;
    //     console.log(user);
    //   })
    //   .catch((error) => {
    //     // 로그인 실패
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     console.log("로그인에 실패하였습니다.");
    //   });
  };

  return (
    <div className="card-container">
      <div className="wrap flex">
        <div className="white">
          <div>
            <h3>Lorem Ipsum</h3>
          </div>

          <span>
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </span>
        </div>
        <div className="white">
          <div className="tab flex">
            <h3>Login</h3>
            <h3>SignUp</h3>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
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
              <button type="submit">로그인</button>
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
