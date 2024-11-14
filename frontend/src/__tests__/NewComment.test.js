import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewComment from '../components/NewComment';


describe('NewComment Component', () => {
   
    const mockOnCommentCreated = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });


   
    test('renders NewComment with input and button', () => {
        render(
            <NewComment
                userName="Test User"
                postId={1}
                userId={1}
                onCommentCreated={mockOnCommentCreated}
            />
        );

        const input = screen.getByLabelText(/write your comment/i);
        expect(input).toBeInTheDocument();
       
        const button = screen.getByRole('button', { name: /add comment/i });
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    test('enables the button when input is not empty', () => {
        render(
            <NewComment
                userName="Test User"
                postId={1}
                userId={1}
                onCommentCreated={mockOnCommentCreated}
            />
        );

        const input = screen.getByLabelText(/write your comment/i);
        const button = screen.getByRole('button', { name: /add comment/i });

        fireEvent.change(input, { target: { value: 'Test comment content' } });

        expect(button).toBeEnabled();
    });

   
    test('calls onCommentCreated with correct arguments when submitted', () => {
        render(
            <NewComment
                userName="Test User"
                postId={1}
                userId={1}
                onCommentCreated={mockOnCommentCreated}
            />
        );

        const input = screen.getByLabelText(/write your comment/i);
        const button = screen.getByRole('button', { name: /add comment/i });

        fireEvent.change(input, { target: { value: 'This is a test comment' } });
        fireEvent.click(button);
       
        expect(mockOnCommentCreated).toHaveBeenCalledWith('This is a test comment', 1, 1);
        expect(mockOnCommentCreated).toHaveBeenCalledTimes(1);
    });


   
    test('clears the input field after submitting a comment', () => {
        render(
            <NewComment
                userName="Test User"
                postId={1}
                userId={1}
                onCommentCreated={mockOnCommentCreated}
            />
        );

        const input = screen.getByLabelText(/write your comment/i);
        const button = screen.getByRole('button', { name: /add comment/i });
       
        fireEvent.change(input, { target: { value: 'Clear this comment' } });
        fireEvent.click(button);

        expect(input.value).toBe('');
    });


    test('disables the button after clearing the input field on submission', () => {
        render(
            <NewComment
                userName="Test User"
                postId={1}
                userId={1}
                onCommentCreated={mockOnCommentCreated}
            />
        );

        const input = screen.getByLabelText(/write your comment/i);
        const button = screen.getByRole('button', { name: /add comment/i });

        fireEvent.change(input, { target: { value: 'Another test comment' } });
        fireEvent.click(button);

        expect(button).toBeDisabled();
    });
});



