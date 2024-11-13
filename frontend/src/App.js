import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import './App.css';
import Login from "./components/Login";
import PostList from "./components/PostList";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState(null);

    const handleLogin = async(email, password) => {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password})
            });
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            const loginResponse = await response.json();
            if (loginResponse.isValid) {
                setIsAuthenticated(true);
                setUserName(loginResponse.userName);
                setUserId(loginResponse.userId);
                setShowLogin(false);
                sessionStorage.setItem('userName', loginResponse.userName);
                sessionStorage.setItem('isAuthenticated', 'true');
                sessionStorage.setItem('userId', loginResponse.userId);
            }
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('userId');
        setUserName('');
        setIsAuthenticated(false);
        setUserId(null)
    };

    const showLoginForm = () => {
        setShowLogin(true);
        sessionStorage.setItem('showLogin', true)
    };

    useEffect(() => {
        // Handle user session persistence
        const userName = sessionStorage.getItem('userName');
        const isAuthenticated = sessionStorage.getItem('isAuthenticated');
        const userId = sessionStorage.getItem('userId');
        if (userName && isAuthenticated && userId) {
            setUserName(userName);
            setIsAuthenticated(isAuthenticated);
            setUserId(userId);
        }
    }, [userName, isAuthenticated, userId]);

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
            setUserId(newState.userId);
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
                </>
            );
        } else {
            buttonContent = (
                <Button variant="outlined" color="primary" onClick={showLoginForm}>Login</Button>
            );
        }

        return (
            <>
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
            <PostList userId={userId} userName={userName} isAuthenticated={isAuthenticated}></PostList>
            </>
        );
        
    }

    return (
        <Container maxWidth="lg">
            <Box textAlign="center" mt={5}>
                {renderLogin()}
            </Box>
        </Container>
    );

}

export default App;
