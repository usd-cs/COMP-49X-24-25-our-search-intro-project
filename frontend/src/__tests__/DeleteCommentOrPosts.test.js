import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteCommentOrPosts from '../components/DeleteCommentOrPosts';

describe('DeleteCommentOrPosts Component', () => {
  test('renders delete icon', () => {
    const mockOnDelete = jest.fn();
    render(<DeleteCommentOrPosts onDelete={mockOnDelete} />);

    const deleteIcon = screen.getByTestId('DeleteOutlinedIcon');
    expect(deleteIcon).toBeInTheDocument();
  });

  test('opens modal when delete icon is clicked', () => {
    const mockOnDelete = jest.fn();
    render(<DeleteCommentOrPosts onDelete={mockOnDelete} />);

    const deleteIcon = screen.getByTestId('DeleteOutlinedIcon');
    fireEvent.click(deleteIcon);

    expect(screen.getByText('Are you sure you want to delete?')).toBeInTheDocument();
  });

  test('calls onDelete when Delete button is clicked', () => {
    const mockOnDelete = jest.fn();
    render(<DeleteCommentOrPosts onDelete={mockOnDelete} />);

    const deleteIcon = screen.getByTestId('DeleteOutlinedIcon');
    fireEvent.click(deleteIcon);

    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  test('closes modal when Cancel button is clicked', () => {
    const mockOnDelete = jest.fn();
    render(<DeleteCommentOrPosts onDelete={mockOnDelete} />);

    const deleteIcon = screen.getByTestId('DeleteOutlinedIcon');
    fireEvent.click(deleteIcon);

    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelButton);

    expect(screen.queryByText('Are you sure you want to delete?')).not.toBeInTheDocument();
  });
});
