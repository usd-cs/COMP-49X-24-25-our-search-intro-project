import React, { useState } from "react";
import { Button, Container, Typography, Box, TextField, Paper, Avatar, Stack} from "@mui/material";
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

const Comment = ({ commentData }) => {
    const { userName, content, createdAt, commentId} = commentData;   

    const [clicked, setClicked] = useState(false);
    const [commentText, setCommentText] = useState(content);
    const [openModal, setOpenModal] = useState(false);


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        maxWidth: 400,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      }));
      
      const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });



  return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                {/* Left side: Avatar and userName */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar>{userName[0].toUpperCase()}</Avatar>
                    <Typography variant="subtitle2" color="text.primary">
                        {userName}
                    </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                    {formattedDate}
                </Typography>
            </Stack>
            <Typography variant="body1">
                {content}
            </Typography>
        </Item>
    </Box>
    );
    
}
export default Comment;

