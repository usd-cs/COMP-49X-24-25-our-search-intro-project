package our_search.intro_project.comments.controller;

import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import our_search.intro_project.comments.dto.FetchedComment;
import our_search.intro_project.comments.dto.GetCommentRequest;
import our_search.intro_project.database.services.CommentService;

import java.util.List;

@RestController("commentFetchController")
@RequestMapping("/comment")
@CrossOrigin(origins = "http://localhost:3000")
public class FetchController {

    private final CommentService commentService;

    @Autowired
    public FetchController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public List<FetchedComment> getCommentsByPostId(@RequestBody GetCommentRequest request) {
        return commentService.getCommentsByPostId(request.getPostId()).stream()
                .map(
                        comment ->
                                new FetchedComment(
                                        comment.getCommentId(),
                                        comment.getContents(),
                                        comment.getUser().getName(),
                                        comment.getCreatedAt()))
                .sorted((comment1, comment2) -> comment2.getCreatedAt().compareTo(comment1.getCreatedAt()))
                .collect(Collectors.toList());
    }
}
