import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import NewComment from './NewComment';

const Post = ({ postData }) => {

    const { userId, userName, content, postId } = postData;

    const [comments, setComments] = useState([]);

    const handleCommentCreated = (commentContent, postId, userId) => {
      const newComment = {
          userId,
          userName,
          content: commentContent,
          postId,
      };
      setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <Card variant="outlined" sx={{ width: 600, height: 200, margin: 'auto', mb: 2, backgroundColor: '#bbdefb' }}>
      <CardHeader
        subheader={userName}
      />
      <CardContent>
        <Typography variant="body1">
          {content}
        </Typography>

        {/* Render NewComment */}
        <NewComment 
            postId={postId} 
            userId={userId} 
            userName={userName} 
            onCommentCreated={handleCommentCreated} 
        />

        {/* Render Comments List */}
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





      </CardContent>
    </Card>
  );
};

export default Post;