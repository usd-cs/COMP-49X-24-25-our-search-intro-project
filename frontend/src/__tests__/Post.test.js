import { render, screen, fireEvent } from '@testing-library/react';
import Post from '../components/Post';
import React from "react";

describe('Post', () => {

    const mockPostData = {
        userId: 333,
        postId: 444,
        userName: "Comp491 student",
        content: "This is a sample post content.",
        createdAt: "2023-11-12T10:30:45.123Z"
    };

    test("Post UI renders correctly with create new comment option when authenticated", () => {
        render(<Post postData={mockPostData} userName={"test username"} isAuthenticated={true}/>);
        
        expect(screen.getByText(mockPostData.userName)).toBeInTheDocument();
        expect(screen.getByText(mockPostData.content)).toBeInTheDocument();

        const formattedDate = new Date(mockPostData.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
        expect(screen.getByText(`Posted on ${formattedDate}`)).toBeInTheDocument();

        expect(screen.getByText('Add Comment')).toBeInTheDocument();
    });

    test("Post UI does not show new comment option when not authenticated", () => {
        render(<Post postData={mockPostData} userName={"test username"} isAuthenticated={false}/>);
        expect(screen.queryByText('Add Comment')).not.toBeInTheDocument();
    });

    test("Post UI does not show delete option when not admin", () => {
        render(<Post postData={mockPostData} userName={"test username"} isAuthenticated={false} isAdmin={false}/>);
        expect(screen.queryByTestId('DeleteOutlinedIcon')).not.toBeInTheDocument();
    });

    test("Post UI shows delete option when admin", () => {
        render(<Post postData={mockPostData} userName={"test username"} isAuthenticated={false} isAdmin={true}/>);

        const deleteIcon = screen.getByTestId('DeleteOutlinedIcon');
        expect(deleteIcon).toBeInTheDocument();
    });

    test("Delete post button fires when clicked", () => {
        const mockOnPostDeleted = jest.fn();
    
        render(<Post postData={mockPostData} userName={"test username"} isAuthenticated={false} isAdmin={true} onPostDeleted={mockOnPostDeleted}/>);
    
        const deleteIcon = screen.getByTestId('DeleteOutlinedIcon');
        fireEvent.click(deleteIcon);
    
        expect(screen.getByText('Are you sure you want to delete?')).toBeInTheDocument();
    
        const deleteButton = screen.getByRole('button', { name: /Delete/i });
        fireEvent.click(deleteButton);
    
        expect(mockOnPostDeleted).toHaveBeenCalledTimes(1);
        expect(mockOnPostDeleted).toHaveBeenCalledWith(mockPostData.postId);
    });


});