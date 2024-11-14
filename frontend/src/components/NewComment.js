import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, TextField, Button } from "@mui/material";


const NewComment = ({ postId, userId, userName, onCommentCreated }) => {
    const [newCommentContent, setNewCommentContent] = useState('');

    const handleSubmit = () => {
        if (!newCommentContent.trim()) return;

        onCommentCreated(newCommentContent, userId, postId);

        setNewCommentContent('');
    };


    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mb: 2 }}>
            <CardHeader subheader={`Commenting as ${userName}`} />
            <CardContent>
                <TextField
                    label="Write your comment..."
                    multiline
                    rows={2}
                    variant="outlined"
                    fullWidth
                    value={newCommentContent}
                    onChange={(e) => setNewCommentContent(e.target.value)}
                />
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!newCommentContent.trim()}
                    fullWidth
                >
                    Add Comment
                </Button>
            </CardActions>
        </Card>
    );
};


export default NewComment;



