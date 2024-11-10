import { Card, CardHeader, CardContent, Typography } from '@mui/material';

const Post = ({ postData }) => {

    const { userName, content } = postData;

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mb: 2 }}>
      <CardHeader
        subheader={userName}
      />
      <CardContent>
        <Typography variant="body1">
          {content}
        </Typography>
      </CardContent>

      {/* <CardActions disableSpacing>
        
      </CardActions> */}
    </Card>
  );
};

export default Post;