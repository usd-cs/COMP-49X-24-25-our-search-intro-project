import { render, screen, waitFor } from '@testing-library/react';
import PostList from '../components/PostList';
import React from "react";

describe('PostList', () => {

  const userName = 'Dr. Sat';

  const posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
  ];

  test('Displays posts when data is fetched successfully', async () => {
    fetch.mockResolvedValue({ 
        ok: true, 
        json: async () => ({ data: posts }), 
    }); 

    render(<PostList userName={userName} isAuthenticated={true}/>);

    // Check that each post is displayed
    await waitFor(() => {
        posts.forEach(post => {
            expect(screen.getByText(post.title)).toBeInTheDocument();
          });
    });
  });

  test('Displays an error message when the fetch fails', async () => {
    fetch.mockResolvedValue({
        ok: false, 
        status: 500, 
        json: async () => ({ message: 'Internal server error' }),
    });

    render(<PostList userName={userName} isAuthenticated={true}/>);

    await waitFor(() => {
      expect(screen.getByText(/error fetching posts/i)).toBeInTheDocument();
    });
  });

  test('Calls the correct API endpoint', async () => {
    global.fetch = jest.fn(() => 
        Promise.resolve({ 
            ok: true, 
            status: 200, 
            json: async () => ({ data: posts }), 
        }) 
    );

    render(<PostList userName={userName} isAuthenticated={true}/>);

    await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/backend/posts');
    });
  });

  test('Renders the correct number of posts', async () => {
    global.fetch = jest.fn(() => 
        Promise.resolve({ 
            ok: true, 
            status: 200, 
            json: async () => ({ data: posts }), 
        }) 
    );

    render(<PostList userName={userName} isAuthenticated={true}/>);

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(posts.length);
    });
  });
});