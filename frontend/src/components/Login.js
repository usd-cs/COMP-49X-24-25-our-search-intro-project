import React, { useState } from "react";

function Login({ handleLogin, setShowLogin }) {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        // calls the prop handleLogin with email and password
        e.preventDefault(); 
        handleLogin(email, password);
    };

    const handleBack = () => {
        sessionStorage.removeItem('showLogin');
        setShowLogin(false);
    };

    return (
        <>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label> 
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
            <label htmlFor="password">Password:</label> 
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /> 
            <button type="button" onClick={handleBack}>Back</button> 
            <button type="submit">Login</button>
        </form>
        </>

        // inside form:
        // user input 1: placeholder text = email
        // user input 2: placeholder text = password
        // submit event: button that says 'login'
        // button that says 'back' - onClick={handleBack}

        // after the user hits submit to log in, if successful, setShowLogin(false) to stop showing the login form
        // if not successful, display error message 
    );
}

export default Login;