import React from 'react';
import { render, screen } from '@testing-library/react';
import Comment from './Comment';

const fakeCommentData = {
    userId: 1,
    userName: 'Student 1',
    content: 'Hello, this is a test comment!',
    postId: 3,
    createdAt: "2024-11-12T10:30:45.123Z",
};

test('renders Comment component with correct data', () => {
    render(<Comment commentData={fakeCommentData} />);

    // Check that userName is displayed
    expect(screen.getByText(/student 1/i)).toBeInTheDocument();

    // Check that content is displayed
    expect(screen.getByText(/this is a test comment!/i)).toBeInTheDocument();

    // Check that the formatted date is displayed
    const formattedDate = new Date(fakeCommentData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    expect(screen.getByText(formattedDate)).toBeInTheDocument();

    // Check that Avatar shows the first letter of userName
    expect(screen.getByText(/S/i)).toBeInTheDocument();
});
