import { Card, CardHeader, CardContent, Typography } from '@mui/material';

const Post = ({ postData }) => {

    const { userId, userName, content, postId } = postData;

  return (
    <Card variant="outlined" sx={{ width: 600, height: 200, margin: 'auto', mb: 2, backgroundColor: '#bbdefb' }}>
      <CardHeader
        subheader={userName}
      />
      <CardContent>
        <Typography variant="body1">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;