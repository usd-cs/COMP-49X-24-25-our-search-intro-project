import { render, screen } from '@testing-library/react';
import Post from '../components/Post';
import React from "react";

describe('Post', () => {
    test("Post UI renders correctly with create new comment option when authenticated", () => {
        const mockPostData = {
            userId: 333,
            postId: 444,
            userName: "Comp491 student",
            content: "This is a sample post content.",
            createdAt: "2023-11-12T10:30:45.123Z"
        };

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
        const mockPostData = {
            userId: 333,
            postId: 444,
            userName: "Comp491 student",
            content: "This is a sample post content.",
            createdAt: "2023-11-12T10:30:45.123Z"
        };

        render(<Post postData={mockPostData} userName={"test username"} isAuthenticated={false}/>);
        expect(screen.queryByText('Add Comment')).not.toBeInTheDocument();
    });
});