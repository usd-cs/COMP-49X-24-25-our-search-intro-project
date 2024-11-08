import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios';
import PostList from '../components/PostList';

describe('PostList', () => {

  const userId = '123';

  const posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
  ];

  test('Displays posts when data is fetched successfully', async () => {
    axios.get.mockResolvedValueOnce({ data: posts });

    render(<PostList userId={userId} isAuthenticated={true}/>);

    // Check that each post is displayed
    await waitFor(() => {
        posts.forEach(post => {
            expect(screen.getByText(post.title)).toBeInTheDocument();
          });
    });
  });

  test('Displays an error message when the fetch fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching posts'));

    render(<PostList userId={userId} isAuthenticated={true}/>);

    await waitFor(() => {
      expect(screen.getByText(/error fetching posts/i)).toBeInTheDocument();
    });
  });

  test('Calls the correct API endpoint', async () => {
    axios.get.mockResolvedValueOnce({ data: posts });

    render(<PostList userId={userId} isAuthenticated={true}/>);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/backend/posts');  //TODO ask augusto what the endpoint is 
    });
  });

  test('Renders the correct number of posts', async () => {
    axios.get.mockResolvedValueOnce({ data: posts });

    render(<PostList userId={userId} isAuthenticated={true}/>);

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(posts.length);
    });
  });
});