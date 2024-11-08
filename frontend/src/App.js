import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import './App.css';
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userName, setuserName] = useState('');

  const handleLogin = (email, password) => {
     // call backend 
     // if backend returns true, setIsAuthenticated to true and setShowLogin false
     // get userName from backend response
     // set isAuthenticated and userName in session storage
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('isAuthenticated');
    setuserName('');
    setIsAuthenticated(false);
  };

  const showLoginForm = () => {
    setShowLogin(true);
    sessionStorage.setItem('showLogin', true)
  };

  useEffect(() => {
    // Handle user session persistence
    const userName = sessionStorage.getItem('userName');
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (userName && isAuthenticated) { 
        setuserName(userName);
        setIsAuthenticated(isAuthenticated);
    }
  }, [userName, isAuthenticated]);

  useEffect(() => {
    // Handle sesson persistence for showing login page
    const showLogin = sessionStorage.getItem('showLogin');
    if (showLogin) {
        setShowLogin(true);
    }
  }, [showLogin]);

  return (
    <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>

            <Typography variant="h4" component="h1" gutterBottom>
            Intro Project
            </Typography>

            {showLogin ? (
                <>
                <Login onLogin={handleLogin} setShowLogin={setShowLogin}></Login>
                </>
            ) : (
                <>
                {isAuthenticated ? (
                    <>
                    <Button variant="outlined" color="primary" onClick={handleLogout}>Logout</Button>
                    <p> button to create post here </p>
                    </>
                ) : (
                    <>
                    <Button variant="outlined" color="primary" onClick={showLoginForm}>Login</Button>
                    </>
                )}
                <Typography variant="body1" mt={2}>
                    Insert posts here
                </Typography>
                </>
            )}
        </Box>
    </Container>
  );
    // render postlist because posts show regardless of if logged in or not
    // pass userName to postlist in case the user creates a new post
}

export default App;
