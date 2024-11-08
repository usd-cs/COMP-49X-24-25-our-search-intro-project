import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '/Post';

const PostList = ( {userId} ) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

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
  // a list of posts where each post is a Post component; pass in the info from fetchPosts

  // create new post button - when clicked, showCreatePost true
  // pass onPostCreated to CreatePost
  // pass userId to CreatePost
//   );
};

export default PostList;
