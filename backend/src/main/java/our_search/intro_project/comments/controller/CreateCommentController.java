package our_search.intro_project.comments.controller;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import our_search.intro_project.comments.dto.CreateCommentRequest;
import our_search.intro_project.comments.dto.FetchedComment;
import our_search.intro_project.database.entities.Comment;
import our_search.intro_project.database.entities.Post;
import our_search.intro_project.database.entities.User;
import our_search.intro_project.database.services.CommentService;
import our_search.intro_project.database.services.PostService;
import our_search.intro_project.database.services.UserService;

@RestController
@RequestMapping("/create/comment")
@CrossOrigin(origins = "http://localhost:3000")
public class CreateCommentController {

  private final CommentService commentService;
  private final PostService postService;
  private final UserService userService;

  @Autowired
  public CreateCommentController(CommentService commentService, PostService postService, UserService userService) {
    this.commentService = commentService;
    this.postService = postService;
    this.userService = userService;
  }

  @PostMapping
  public ResponseEntity<FetchedComment> createComment(@Valid @RequestBody CreateCommentRequest request) {
    User user = userService.getUserById(request.getUserId())
        .orElseThrow(() -> new IllegalArgumentException("User not found"));
    Post post = postService.getPostById(request.getPostId()).orElseThrow(() -> new IllegalArgumentException("Post not found"));
    Comment newComment = new Comment(request.getContent(), user, post);
    newComment.setCreatedAt(LocalDateTime.now());
    Comment savedComment = commentService.createComment(newComment);

    FetchedComment response = new FetchedComment(
        savedComment.getCommentId(),
        savedComment.getContents(),
        savedComment.getUser().getName(),
        savedComment.getCreatedAt()
    );
    return new ResponseEntity<>(response,
                                HttpStatus.CREATED);
  }
}
