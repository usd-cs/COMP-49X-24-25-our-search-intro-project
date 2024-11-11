import { render, screen, fireEvent } from '@testing-library/react';
import React from "react";
import NewPost from '../components/NewPost';

describe('NewPost', () => {
    test("UI renders correctly", () => {
        const userName = 'test';
        const userId = 47;
        const mockCreatePost = jest.fn();
        render(<NewPost userId={userId} userName={userName} onPostCreated={mockCreatePost}/>);
        
        expect(screen.getByText(userName)).toBeInTheDocument();

        const textInput = screen.getByLabelText("Write your post...");
        expect(textInput).toBeInTheDocument();

        const createPostButton = screen.getByRole('button', { name: /Create Post/i });
        expect(createPostButton).toBeInTheDocument();
    });

    test("Create post button fires when clicked", () => {
        const userName = 'test';
        const userId = 44;
        const mockCreatePost = jest.fn();
        render(<NewPost userId={userId} userName={userName} onPostCreated={mockCreatePost}/>);

        // Simulate user typing in the text input to enable the button
        const textInput = screen.getByLabelText("Write your post...");
        fireEvent.change(textInput, { target: { value: 'Hello World' } });
        const createPostButton = screen.getByRole('button', { name: /Create Post/i });
        expect(createPostButton).not.toBeDisabled();

        fireEvent.click(createPostButton);
        expect(mockCreatePost).toHaveBeenCalledTimes(1);
    });
});