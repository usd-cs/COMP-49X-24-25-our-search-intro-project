import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DeleteCommentOrPosts({ commentId, postId, onDelete }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <DeleteOutlinedIcon onClick={handleOpen} sx={{ cursor: 'pointer' }} />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you want to delete?
                    </Typography>
                    <Grid container justifyConxtent="center" spacing={2} sx={{ mt: 3 }}>
                        <Grid item>
                            <Button variant="outlined" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={onDelete} color="error">
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
