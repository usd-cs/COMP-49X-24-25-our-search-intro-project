import React, { useEffect, useState } from 'react';
import { Button, Container, Typography, Box } from "@mui/material";
// import Post from '/Post';

const PostList = ( {userName, isAuthenticated} ) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // Fetch all posts from the backend
  };

  const onPostCreated = async (e) => {
    // Refresh the posts by calling fetchPosts again
  };

//   return (
// input field and button to create post at the top shows if isAuthenticated = true
  // a list of posts where each post is a Post component; pass in the info from fetchPosts
//   );
};

export default PostList;
