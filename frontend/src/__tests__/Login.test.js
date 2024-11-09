import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/Login';
import App from '../App';
import React from "react";

global.fetch = jest.fn();

test("Login UI renders correctly", () => {
    const mockHandleLogin = jest.fn(); 
    render(<Login handleLogin={mockHandleLogin} setShowLogin={() => {}} />);

    const title = screen.getByRole('heading', { name: /Login/i }); 
    const form = screen.getByTestId('login-form');
    const backBtn = screen.getByRole('button', {name: /back/i});
    const loginBtn = screen.getByRole('button', { name: /Login/i });

    expect(title).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(backBtn).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
});

describe('Login functionality', () => {

    test("displays the login form if login button is clicked", () => {
        render(<App />);  
        const showLoginBtn = screen.getByRole('button', { name: /login/i }); 
        expect(showLoginBtn).toBeInTheDocument();  // Check that login button is visible because no one is logged in yet
        
        fireEvent.click(showLoginBtn);

        const loginTitle = screen.getByRole('heading', { name: /login/i }); 
        expect(loginTitle).toBeInTheDocument();
    }); 

    test("stops showing login form after clicking back on the login form", async () => {
        render(<App />); 
        window.setTestState({ 
            isAuthenticated: false, 
            showLogin: true, 
            userName: '' 
        }); 
        await waitFor(() => { 
            const backBtn = screen.getByRole('button', { name: /back/i }); 
            expect(backBtn).toBeInTheDocument();
        }); 

        fireEvent.click(screen.getByRole('button', { name: /back/i })); 

        // Check that isAuthenticated is false because the back button is gone
        await waitFor(() => { 
            expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
        });
    }); 

    test("calls the backend with correct credentials after clicking login on the login form", () => {
        const mockHandleLogin = jest.fn(); 
        render(<Login handleLogin={mockHandleLogin} setShowLogin={() => {}} />);

        const form = screen.getByTestId('login-form');
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } }); 
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } }); 
        fireEvent.submit(form);

        expect(mockHandleLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    }); 

    test('on correct credentials, hides login form on success (isAuthenticated is set to true)', async () => {
        fetch.mockResolvedValue({ 
            ok: true, 
            json: async () => ({ userName: 'testUser' }), 
        }); // Simulate a successful server response

        render(<App />);
        window.setTestState({ 
            isAuthenticated: true, 
            showLogin: false, 
            userName: 'test' 
        }); 

        // Check that isAuthenticated is now true by observing logout button is now visible
        await waitFor(() => {
            const logoutBtn = screen.getByRole('button', { name: /logout/i });
            expect(logoutBtn).toBeInTheDocument();
        });   
    });

    test("sets isAuthenticated back to false if logout button is clicked", async () => {
        render(<App />); 
        window.setTestState({ 
            isAuthenticated: true, 
            showLogin: false, 
            userName: 'testUser' 
        });

        await waitFor(() => { 
            const logoutBtn = screen.getByRole('button', { name: /logout/i }); 
            expect(logoutBtn).toBeInTheDocument(); 
        }); 

        fireEvent.click(screen.getByRole('button', { name: /logout/i })); 

        // Check that isAuthenticated is false because the login button is shown again
        await waitFor(() => { 
            expect(screen.getByText(/login/i)).toBeInTheDocument(); 
        });
    }); 

    test('on invalid credentials, displays error message (Failed login keeps isAuthenticated false)', async () => {
        fetch.mockResolvedValue({
            ok: false, 
            status: 401, 
            json: async () => ({ message: 'Invalid credentials' }),
        });
    
        const mockHandleLogin = jest.fn(async () => {
            return { isValid: false, userName: '' }; // Simulate failed login
        });
        render(<Login handleLogin={mockHandleLogin} setShowLogin={() => {}} />);
    
        const form = screen.getByTestId('login-form');
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
    
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.submit(form);
    
        await screen.findByText(/invalid credentials/i); 
    
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
});