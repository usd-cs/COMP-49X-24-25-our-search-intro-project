import React, { useState } from "react";

function Login({ handleLogin, setShowLogin }) {
    // const [email, setEmail] = useState(''); 
    // const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        // calls the prop handleLogin with email and password
    };

    return (
        <>
        <form onSubmit={handleSubmit}>

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