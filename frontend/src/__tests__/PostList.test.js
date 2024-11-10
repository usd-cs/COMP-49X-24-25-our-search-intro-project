import { render, screen, waitFor } from '@testing-library/react';
import PostList from '../components/PostList';
import React from "react";

describe('PostList', () => {

  const userName = 'Dr. Sat';

  const posts = [
    { userName: 'test 1', content: 'Post 1' },
    { userName: 'test 2', content: 'Post 2' },
  ];

  test('Displays posts when data is fetched successfully', async () => {
    global.fetch = jest.fn(() => 
        Promise.resolve({ 
            ok: true, 
            status: 200, 
            json: async () => posts, 
        }) 
    );

    render(<PostList userName={userName} isAuthenticated={true}/>);

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

    render(<PostList userName={userName} isAuthenticated={true}/>);

    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('backend/posts', expect.objectContaining({
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

    render(<PostList userName={userName} isAuthenticated={true}/>);

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(posts.length);
    });
  });
});