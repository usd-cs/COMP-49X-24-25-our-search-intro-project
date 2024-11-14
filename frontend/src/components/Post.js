import { Card, CardHeader, CardContent, Typography, List, ListItem } from '@mui/material';
import NewComment from './NewComment';
import React, { useEffect, useState } from 'react';
import Comment from './Comment';

const Post = ({ postData, currentUserName, isAuthenticated }) => {

  const { postId, userName, content, createdAt } = postData;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (postId) {
      fetchComments(postId);
    }
    const fakeComments = [
        { userId: 1, userName: 'Student 1', content: 'Hello', postId: 3, createdAt: "2024-11-12T10:30:45.123Z" },
        { userId: 2, userName: 'Peter Park', content: 'Alo', postId: 3, createdAt:"2024-11-24T10:30:45.123Z" }
    ]
    setComments(fakeComments);
}, [postId]);

  const handleCommentCreated = async (commentContent, userId, postId) => {
    await createComment(commentContent, userId, postId);
    await fetchComments(postId);
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
      />
      <CardContent>
        <Typography variant="body1">
          {content}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          Posted on {formattedDate}
        </Typography>

        {comments.length > 0 && (
              <List>
                  {comments.map((comment) => (
                      <React.Fragment key={comment.id}>
                          <ListItem>
                              <Comment commentData={comment}/>
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
            onCommentCreated={handleCommentCreated}
          />
        )}

      </CardContent>
    </Card>
  );
};

export default Post;