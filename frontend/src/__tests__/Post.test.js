import { render, screen } from '@testing-library/react';
import Post from '../components/Post';
import React from "react";

describe('Post', () => {
    test("Post UI renders correctly", () => {
        const mockPostData = {
            userId: 333,
            postId: 444,
            userName: "Comp491 student",
            content: "This is a sample post content.",
            createdAt: "2023-11-12T10:30:45.123Z",
            comments: ""  //TODO 
        };

        render(<Post postData={mockPostData}/>);
        
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
    });
});