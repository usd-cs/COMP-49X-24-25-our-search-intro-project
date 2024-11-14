import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Comment from '../components/Comment';
import DeleteCommentOrPosts from '../components/DeleteCommentOrPosts';

describe('Comment', () => {
    const fakeCommentData = {
        commentId: 2,
        userName: 'Student 1',
        content: 'Hello, this is a test comment!',
        createdAt: "2024-11-12T10:30:45.123Z",
    };

    const fakeUserId = 1;
    
    test('renders Comment component with correct data', () => {
    
        const formattedDate = new Date(fakeCommentData.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    
        render(<Comment commentData={fakeCommentData} isAdmin={true} onCommentDeleted={() => {}} userId={fakeUserId}/>);
    
        expect(screen.getByText('Student 1')).toBeInTheDocument();
        expect(screen.getByText('Hello, this is a test comment!')).toBeInTheDocument();
        expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });
    
    test("Comment UI does not show delete option when not admin", () => {
        const fakeCommentData = {
            commentId: 555,
            userName: 'Student 1',
            content: 'Hello, this is a test comment!',
            createdAt: '2024-11-12T10:30:45.123Z',
        };
    
        render(<Comment commentData={fakeCommentData} isAdmin={false} onCommentDeleted={() => {}} />);
        expect(screen.queryByTestId('DeleteOutlinedIcon')).not.toBeInTheDocument();
    });
    
    test("Comment UI shows delete option when admin", () => {
        
          const mockOnCommentDelete = jest.fn();
        
          render(
            <Comment
              commentData={fakeCommentData}
              isAdmin={true}
              onCommentDelete={mockOnCommentDelete}
            />
          );
          
          
          const deleteIcon = screen.getByTestId('DeleteOutlinedIcon');
          expect(deleteIcon).toBeInTheDocument();
    });
    
    test('Delete comment button fires when clicked', () => {
        const mockOnCommentDeleted = jest.fn();
    
        render(
          <Comment
            commentData={fakeCommentData}
            isAdmin={true}
            onCommentDeleted={mockOnCommentDeleted}
            userId={fakeUserId}
          />
        );
    
        const deleteIcon = screen.getByTestId('DeleteOutlinedIcon');
        fireEvent.click(deleteIcon);
    
        expect(screen.getByText('Are you sure you want to delete?')).toBeInTheDocument();
    
        const deleteButton = screen.getByRole('button', { name: /Delete/i });
        fireEvent.click(deleteButton);
    
        expect(mockOnCommentDeleted).toHaveBeenCalledTimes(1);
        expect(mockOnCommentDeleted).toHaveBeenCalledWith(fakeCommentData.commentId, fakeUserId);
      });
});
