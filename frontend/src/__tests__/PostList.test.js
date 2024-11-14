import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PostList from '../components/PostList';
import React from "react";

describe('PostList', () => {

  const userName = 'Dr. Sat';
  const userId = 5;

  const posts = [
    { userId: 1, userName: 'dtrump', content: 'I am the president of the united states', postId: 3, createdAt: "2024-11-12T10:30:45.123Z" },
    { userId: 2, userName: 'kharris', content: 'I tried running for president of the united states of america this year, but sadly I lost to donald trump. yall should have voted', postId: 4, createdAt:"2024-11-24T10:30:45.123Z" }
  ];

  test('Displays posts when data is fetched successfully', async () => {
    global.fetch = jest.fn(() => 
        Promise.resolve({ 
            ok: true, 
            status: 200, 
            json: async () => posts, 
        }) 
    );

    render(<PostList userId={userId} userName={userName} isAuthenticated={true}/>);

    // Check that each post is displayed
    await waitFor(() => {
        posts.forEach(post => {
            expect(screen.getByText(post.content)).toBeInTheDocument();
          });
    });
  });

  test('Calls the correct API endpoint', async () => {
    global.fetch = jest.fn(() => 
        Promise.resolve({ 
            ok: true, 
            status: 200, 
            json: async () =>  posts, 
        }) 
    );

    render(<PostList userId={userId} userName={userName} isAuthenticated={true}/>);

    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/posts', expect.objectContaining({
            method: 'GET',  // Make sure the method is GET
            headers: { 'Content-Type': 'application/json' },  // Ensure the headers are correct
        }));
    });
  });

  test('Renders the correct number of posts', async () => {
    global.fetch = jest.fn(() => 
        Promise.resolve({ 
            ok: true, 
            status: 200, 
            json: async () => posts, 
        }) 
    );

    render(<PostList userId={userId} userName={userName} isAuthenticated={true}/>);

    await waitFor(() => {
      expect(screen.getAllByTestId('post-item')).toHaveLength(posts.length);
    });
  });

  test('Deleting a post removes it from the list', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => posts,
      })
    );
  
    render(<PostList userId={userId} userName={userName} isAuthenticated={false} isAdmin={true} />);
  
    await waitFor(() => {
      expect(screen.getAllByTestId('post-item')).toHaveLength(posts.length);
    });
  
    const deleteIcons = screen.getAllByTestId('DeleteOutlinedIcon');
    fireEvent.click(deleteIcons[0]);  // the first delete icon is for the first post
    console.log(deleteIcons)
  
    const deleteButton = screen.getByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButton);  // another delete button comes up for the modal

    // mock the call to delete the post
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => posts.slice(1)
      })
    );
  
    await waitFor(() => {
      expect(screen.getAllByTestId('post-item')).toHaveLength(posts.length - 1);  // now the screen has one less post on it
    });
  
  });
});