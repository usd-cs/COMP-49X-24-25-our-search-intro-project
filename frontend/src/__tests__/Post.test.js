import { render, screen } from '@testing-library/react';
import Post from '../components/Post';
import React from "react";

describe('Post', () => {
    test("Post UI renders correctly", () => {
        const mockPostData = {
            userName: "Comp491 student",
            content: "This is a sample post content.",
            comments: ""  //TODO 
        };

        render(<Post postData={mockPostData}/>);
        
        expect(screen.getByText(mockPostData.userName)).toBeInTheDocument();
        expect(screen.getByText(mockPostData.content)).toBeInTheDocument();
    });
});