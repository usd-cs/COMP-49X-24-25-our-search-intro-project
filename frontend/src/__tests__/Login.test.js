import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import axios from 'axios';
import Login from '../components/Login';
import App from '../App';

test("Login UI renders correctly", () => {
    render(<Login/>);
    const element = screen.getByText(/Login/);  
    expect(element).toBeInTheDocument();
});

describe('Authentication functionality', () => {

    test("Successful login sends email and password to the server and sets isAuthenticated to true", async () => {
        render(<App />);  // Login component is a child component of app, so we only need to render App
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();  // Check that login button is visible because no one is logged in yet

        axios.post.mockResolvedValueOnce({ status: 200, data: { token: 'fake-token' } });  // mocks retrieving valid credentials 
    
        const emailInput = screen.getByPlaceholderText(/email/i); 
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
    
        fireEvent.change(emailInput, { target: { value: 'testuser' } });  // mocks the login form data being changed by user
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        // Check that isAuthenticated is now true by observing logout button is now visible and login button is no longer visible
        await waitFor(() => {
            const logoutButton = screen.getByRole('button', { name: /logout/i });
            expect(logoutButton).toBeInTheDocument();
        });      
        expect(screen.queryByRole('button', { name: /login/i })).not.toBeInTheDocument();
    });
    
    test('Failed login keeps isAuthenticated false', async () => {
        render(<App />);
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();

        axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));
    
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
    
        fireEvent.change(emailInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(loginButton);
    
        // Check that isAuthenticated is still false because the login button is still in the document
        await waitFor(() => {
            const loginButtonAfterFailedLogin = screen.getByRole('button', { name: /login/i });
            expect(loginButtonAfterFailedLogin).toBeInTheDocument();
        });

        const errorMsg = screen.getByText("Failed login. Please try again");
        expect(errorMsg).toBeInTheDocument();
    });

    test('Logout button sets isAuthenticated back to false', async () =>  {
        render(<App />); 

        axios.post.mockResolvedValueOnce({ status: 200, data: { token: 'fake-token' } });  // Mock a successful login response 
        const emailInput = screen.getByPlaceholderText(/email/i); 
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });
        fireEvent.change(emailInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        // Check that logout button is now in the document because the user has logged in
        await waitFor(() => {
            const logoutButton = screen.getByRole('button', { name: /logout/i });
            expect(logoutButton).toBeInTheDocument();
        });

        // Check that the login button is displayed again after logout button is clicked
        fireEvent.click(screen.getByRole('button', { name: /logout/i }));  // Simulate clicking the logout button
        await waitFor(() => {
            const loginButtonAfterLogout = screen.getByRole('button', { name: /login/i });
            expect(loginButtonAfterLogout).toBeInTheDocument();
        });
    });

});