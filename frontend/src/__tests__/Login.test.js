import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from '../components/Login';
import App from '../App';
const axios = require('axios');
jest.mock('axios');

test("Login UI renders correctly", () => {
    const fakeProps = { 
        handleLogin: jest.fn(), 
        setShowLogin: jest.fn() 
    };
    render(<Login {...fakeProps} />);

    const title = screen.getByText(/Login/);  
    const form = screen.getByRole('form');
    const backBtn = screen.getByRole('button', {name: /back/i});
    const loginBtn = screen.getByRole('button', {name: /login/i});

    expect(title).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(backBtn).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
});

describe('Login functionality', () => {

    test("displays the login form if login button is clicked", () => {
        render(<App />);  
        const showLoginBtn = screen.getByText(/login/i); 
        expect(showLoginBtn).toBeInTheDocument();  // Check that login button is visible because no one is logged in yet
        
        fireEvent.click(showLoginBtn);

        const loginTitle = screen.getByText(/Login/);  
        expect(loginTitle).toBeInTheDocument();
    }); 

    test("sets isAuthenticated back to false if logout button is clicked", async () => {
        render(<App />); 
        window.setTestState({  // Directly set the state to simulate a logged-in user 
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
        render(<App />); 
        fireEvent.click(screen.getByText(/login/i)); 
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } }); 
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } }); 

        const mockHandleLogin = jest.fn(); 
        render(<Login handleLogin={mockHandleLogin} setShowLogin={() => {}} />);
        fireEvent.click(screen.getByText(/login/i)); 
        
        // Check if handleLogin was called with the correct credentials 
        expect(mockHandleLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    }); 

    test('on correct credentials, hides login form on success (isAuthenticated is set to true)', async () => {
        axios.post.mockResolvedValue({ status: 200, data: { userName: 'testUser' } }); // Simulate a successful server response

        render(<App />);
        fireEvent.click(screen.getByText(/login/i));
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText(/login/i));

        // Check that isAuthenticated is now true by observing logout button is now visible
        await waitFor(() => {
            const logoutBtn = screen.getByRole('button', { name: /logout/i });
            expect(logoutBtn).toBeInTheDocument();
        });   
    });

    test('on invalid credentials, displays error message (Failed login keeps isAuthenticated false)', async () => {
        axios.post.mockRejectedValue({ response: { status: 401 } }); // Simulate Unauthorized response

        render(<App />);
        fireEvent.click(screen.getByText(/login/i));
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByText(/login/i));

        await screen.findByText(/invalid credentials/i);

        // Check if the error message is displayed and the login form is still visible
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });
});