import { render, screen, waitFor } from '@testing-library/react';
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
      expect(screen.getAllByRole('listitem')).toHaveLength(posts.length);
    });
  });
});