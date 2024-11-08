import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";

function Login({ handleLogin }) {
    const [username, setemail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        // calls the prop handleLogin with email and password
      };

    return (
        <form onSubmit={handleSubmit}>

        </form>

        // inside form:
        // user input 1: placeholder text = email
        // user input 2: placeholder text = password
        // submit event: button that says 'login'
    );
}

export default Login;