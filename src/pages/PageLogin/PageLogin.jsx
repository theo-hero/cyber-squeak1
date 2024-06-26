import { useRef, useState, useContext } from "react";
import app from "../../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";



// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


const PageLogin = (props) => {

  const ctx = useContext(AppContext);
  
  const loginRef = useRef();
  const passRef = useRef();

  const handleOnLogin = () =>{

    let email = loginRef.current.value;
    let password = passRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // setIsLoggedIn(true);
        ctx.loginHandler();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message)
      });
  
  }

  return (
    <>
      Login page
      <p>{ctx.isLoggedIn && "Вы вошли"}</p>
      <input type="text" ref={loginRef} placeholder="Login" />
      <input type="password" ref={passRef} placeholder="Password"/>

      <button onClick={handleOnLogin}>Login</button>
      <button>Logout</button>
      <Breadcrumbs>
        <Link to="/">Основная</Link>
        <Link to="/settings">Настройки</Link>
        <Link to="/login">Вход</Link>
      </Breadcrumbs>
    </>
  );
};

export default PageLogin;
