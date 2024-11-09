import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import './App.css';
import Login from "./components/Login";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [userName, setUserName] = useState('');

    const handleLogin = (email, password) => {
        // call backend 
        // if backend returns true, setIsAuthenticated to true and setShowLogin false
        // get userName from backend response
        // set isAuthenticated and userName in session storage
        return { isValid: false, userName: '' };
    };

    const handleLogout = () => {
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('isAuthenticated');
        setUserName('');
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
            setUserName(userName);
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

    // Method for test purposes to set isAuthenticated directly 
    if (process.env.NODE_ENV === 'test') { 
        window.setTestState = (newState) => { 
            setIsAuthenticated(newState.isAuthenticated); 
            setShowLogin(newState.showLogin); 
            setUserName(newState.userName); 
        }; 
    }

    const renderLogin = () => {
        if (showLogin) {
            return (
                <Login handleLogin={handleLogin} setShowLogin={setShowLogin} />
            );
        } else {
            return renderButtons();
        }
    };

    const renderButtons = () => {
        let buttonContent;

        if (isAuthenticated) {
            buttonContent = (
                <>
                    <Button variant="outlined" color="primary" onClick={handleLogout}>Logout</Button>
                    <p>button to create post here</p>
                </>
            );
        } else {
            buttonContent = (
                <Button variant="outlined" color="primary" onClick={showLoginForm}>Login</Button>
            );
        }

        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    position: 'relative'
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Intro Project
                </Typography>
                {buttonContent}
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box textAlign="center" mt={5}>

                {renderLogin()}

                <Typography variant="body1" mt={2}>
                    Insert posts here
                </Typography>
            </Box>
        </Container>

    );
    // render postlist because posts show regardless of if logged in or not
    // pass userName to postlist in case the user creates a new post
}

export default App;
