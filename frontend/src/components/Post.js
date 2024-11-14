import { Card, CardHeader, CardContent, Typography, List, ListItem } from '@mui/material';
import NewComment from './NewComment';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import DeleteCommentOrPosts from './DeleteCommentOrPosts';

const Post = ({ postData, currentUserName, isAuthenticated, isAdmin, onPostDeleted }) => {

  const { postId, userName, content, createdAt } = postData;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (postId) {
      fetchComments(postId);
    }
    // const fakeComments = [
    //     { userName: 'Student 1', content: 'Hello', createdAt: "2024-11-12T10:30:45.123Z" },
    //     { userName: 'Peter Park', content: 'Alo', createdAt:"2024-11-24T10:30:45.123Z" }
    // ]
    // setComments(fakeComments);
}, [postId]);

  const onCommentCreated = async (commentContent, userId, postId) => {
    await createComment(commentContent, userId, postId);
    await fetchComments(postId);
  };


  const deleteComment = async (commentId) => {
    try {
        const response = await fetch('http://localhost:8080/delete/comment', {
            method: 'DELETE',
            body: JSON.stringify({ commentId: commentId })
        });
        if (!response.ok) {
            console.error('Failed to delete comment');
        }
    } catch (error) {
        console.error('Error deleting comment', error);
    }
};

const onCommentDeleted = async (commentId) => {
    await deleteComment(commentId);

    // Refresh the posts by calling fetchPosts again
    fetchComments(postId);
};

  const fetchComments = async (postId) => {
    try {
      const response = await fetch('http://localhost:8080/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId: postId })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const comments = await response.json();
      setComments(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };  

  const createComment = async (newCommentContent, userId, postId) => {
    try {
      const response = await fetch('http://localhost:8080/create/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newCommentContent, userId: userId, postId: postId })
      });
      if (!response.ok) {
        throw new Error('Failed to create comment');
      }
      const newComment = await response.json();
      return newComment;
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  // Format createdAt
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <Card variant="outlined" sx={{ width: 600, margin: 'auto', mb: 2, backgroundColor: '#bbdefb' }}>
      <CardHeader
        subheader={userName}
        titleTypographyProps={{ fontWeight: 'bold' }}
        subheaderTypographyProps={{ color: 'text.secondary' }}
        action={
          isAdmin && (
            <DeleteCommentOrPosts
              postId={postData.postId}
              onDelete={() => onPostDeleted(postId)}
            />
          )
        }
      />
      <CardContent>
        <Typography variant="body1">
          {content}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          Posted on {formattedDate}
        </Typography>

        {comments.length > 0 && 
        (
              <List>
                  {comments.map((comment) => (
                      <React.Fragment key={comment.id}>
                          <ListItem>
                              <Comment commentData={comment} isAdmin={isAdmin} onCommentDeleted={onCommentDeleted} />
                          </ListItem>
                      </React.Fragment>
                  ))}
              </List>
          )}


        {isAuthenticated && (
          <NewComment
            postId={postData.postId}
            userId={postData.userId}
            userName={currentUserName}
            onCommentCreated={onCommentCreated}
          />
        )}
        
      </CardContent>
    </Card>
  );
};

export default Post;