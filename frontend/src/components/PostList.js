import React, { useEffect, useState } from 'react';
import Post from "./Post";
import { Typography, Container, List, ListItem } from "@mui/material";
import NewPost from './NewPost';

const PostList = ({ userId, userName, isAuthenticated, isAdmin }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        // Fetch all posts from the backend
        try {
            const response = await fetch('http://localhost:8080/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const createPost = async (newPostContent, userId) => {
        try {
            const response = await fetch('http://localhost:8080/create/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: newPostContent, userId: userId })
            });
            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            const newPost = await response.json();
            return newPost;
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const deletePost = async (postId, userId) => {
        console.log('userId :>> ', userId);
        console.log('postId :>> ', postId);
        try {
            const response = await fetch('http://localhost:8080/delete/post', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ postId: postId, userId: userId})
            });
            if (!response.ok) {
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post', error);
        }
    };

    const onPostDeleted = async (postId, userIdForThisPost) => {
        await deletePost(postId, userIdForThisPost);

        // Refresh the posts by calling fetchPosts again
        fetchPosts();
    };

    const onPostCreated = async (newPostContent, userId) => {
        await createPost(newPostContent, userId);

        // Refresh the posts by calling fetchPosts again
        fetchPosts();
    };

    const renderCreateOption = (isAuthenticated) => {
        if (isAuthenticated) {
            return <NewPost userId={userId} userName={userName} onPostCreated={onPostCreated}></NewPost>
        }
    }    

    return (
        <Container maxWidth="md">
            <Typography variant="h6" component="h2" gutterBottom>
                Posts
            </Typography>
            {renderCreateOption(isAuthenticated)}
            {posts.length > 0 ? (
                <List>
                    {posts.map((post) => (
                        <React.Fragment key={`post-${post.postId}`}>
                            <ListItem data-testid="post-item"> 
                                <Post postData={post} userId={userId} currentUserName={userName} isAuthenticated={isAuthenticated} isAdmin={isAdmin} onPostDeleted={onPostDeleted} ></Post>
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            ) : (
                <Typography variant="body1">No posts available</Typography>  // Optional: display a message if no posts
            )}
        </Container>

    );
};

export default PostList;
