import React, { useState } from "react";
import { Button, TextField, styled, Typography} from "@mui/material";
import MuiCard from '@mui/material/Card';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '450px',
    },
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  }));

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
            return <Typography variant="body1" >Invalid credentials</Typography>
        }
    }

    return (
        <>
        <Typography variant="h4" component="h1">Login</Typography>
        {errorMsg()}
        <form onSubmit={handleSubmit} data-testid="login-form">
            {error && <h5>{error}</h5>}
            <Card variant="outlined">
                <label htmlFor="email">Email</label>
                <TextField
                    error={!!error}
                    helperText={error}
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    autoComplete="email"
                    autoFocus
                    required
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    color={error ? "error" : "primary"}
                />
                <label htmlFor="password">Password</label>
                <TextField
                    error={!!error}
                    helperText={error}
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    required
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    color={error ? "error" : "primary"}
                />
                <Button variant="outlined" onClick={handleBack} style={{ position: 'absolute', top: '0', left: '0', margin: '10px' }}>Back</Button>
                <Button type="submit" variant="contained" style={{ marginTop: '20px' }}>Login</Button>
            </Card>
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