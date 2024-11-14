package our_search.intro_project.database.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import our_search.intro_project.database.entities.Comment;
import our_search.intro_project.database.repositories.CommentRepository;


import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(Integer id) {
        return commentRepository.findById(id);
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Optional<Comment> updateComment(Integer id, Comment updatedComment) {
        return commentRepository.findById(id).map(comment -> {
            comment.setContents(updatedComment.getContents());
            comment.setUser(updatedComment.getUser());
            comment.setPost(updatedComment.getPost());
            return commentRepository.save(comment);
        });
    }

    public boolean deleteComment(Integer id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Comment> getCommentsByPostId(Integer postId) {
        return commentRepository.findByPostId(postId);
    }
}
