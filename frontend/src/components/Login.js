import React, { useState } from "react";

function Login({ handleLogin, setShowLogin }) {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        // calls the prop handleLogin with email and password
        // use fetch
        e.preventDefault(); 
        const res = await handleLogin(email, password);
        if (res) {
            if (res.isValid) {
                setError(false)
                setShowLogin(false);
            } else {
                setError(true);
                setShowLogin(true);
            }
        }
    };

    const handleBack = () => {
        sessionStorage.removeItem('showLogin');
        setShowLogin(false);
    };

    const errorMsg = () => {
        if (error === true) {
            return <h5>Invalid credentials</h5>
        }
    }

    return (
        <>
        <h2>Login</h2>
        {errorMsg()}
        <form data-testid="login-form" onSubmit={handleSubmit}>
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