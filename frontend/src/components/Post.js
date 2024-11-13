import { Card, CardHeader, CardContent, Typography } from '@mui/material';

const Post = ({ postData }) => {

    const { userName, content, createdAt } = postData;

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
      </CardContent>
    </Card>
  );
};

export default Post;