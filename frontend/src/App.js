import React, { useState, useEffect } from "react";
import './App.css';
import Login from "./components/Login";
import PostList from "./components/PostList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userId, setUserId] = useState('');

  const handleLogin = (username, password) => {
     // call backend 
     // if backend returns true, setIsAuthenticated to true and setShowLogin false
     // get userId from backend response
     // set isAuthenticated and userId in session storage
  };

  const handleLogout = () => {
    // remove isAuthenticated and userId from session storage
  };

  useEffect(() => {
    // Handle user session persistence on page reload
    // check if session storage has isAuthenticated and userId -- if so, set them
  }, []);

  return (
    <>
    <h1>test</h1>
    </>

    // login button - showlogin true if login button is clicked
    // handleLogin gets passed to Login component
    // logout button - isAuthenticated false if logout button is clicked

    // render postlist because posts show regardless of if logged in or not
    // pass userId to postlist in case the user creates a new post
  );
}

export default App;
