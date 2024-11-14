import { Card, CardHeader, CardContent, Typography, List, ListItem } from '@mui/material';
import NewComment from './NewComment';
import React, {  useState } from 'react';

const Post = ({ postData, currentUserName, isAuthenticated }) => {

    const { userName, content, createdAt } = postData;
    const [comments, setComments] = useState([]);


    const handleCommentCreated = async (commentContent, userId, postId) => {
      await createComment(commentContent, userId, postId);
     
  };

    const createComment = async (newCommentContent, userId, postId) => {
      try {
          const response = await fetch('http://localhost:8080/create/comment', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ content: newCommentContent, userId: userId, postId:postId })
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
              {comments.map((comment, index) => (
                <ListItem key={index} sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        {comment.userName}: {comment.content}
                      </Typography>
                  </ListItem>
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