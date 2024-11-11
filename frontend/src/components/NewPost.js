import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, TextField, Button } from "@mui/material";

const NewPost = ({ userId, userName, onPostCreated }) => {
    const [newPostContent, setNewPostContent] = useState('');

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mb: 2 }}>
            <CardHeader
                subheader={userName}
            />
            <CardContent>
                <TextField
                    label="Write your post..."
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                />
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onPostCreated(newPostContent, userId)}
                    disabled={!newPostContent.trim()} // Disable button if input is empty
                    fullWidth
                >
                    Create Post
                </Button>
            </CardActions>
        </Card>
    );
};

export default NewPost;