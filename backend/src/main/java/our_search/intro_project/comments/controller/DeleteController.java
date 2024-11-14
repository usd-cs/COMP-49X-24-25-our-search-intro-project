package our_search.intro_project.comments.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import our_search.intro_project.comments.dto.DeleteCommentRequest;
import our_search.intro_project.database.entities.User;
import our_search.intro_project.database.services.CommentService;
import our_search.intro_project.database.services.UserService;

@RestController
@RequestMapping("/delete/comment")
@CrossOrigin(origins = "http://localhost:3000")
public class DeleteController {

  private final CommentService commentService;
  private final UserService userService;

  @Autowired
  public DeleteController(CommentService commentService, UserService userService) {
    this.commentService = commentService;
    this.userService = userService;
  }

  @DeleteMapping
  public ResponseEntity<Void> deletePost(@Valid @RequestBody DeleteCommentRequest deleteCommentRequest) {
    User user =
        userService
            .getUserById(deleteCommentRequest.getUserId())
            .orElseThrow(() -> new IllegalArgumentException("User not found."));

    if (!user.getAdmin()) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    boolean isDeleted = commentService.deleteComment(deleteCommentRequest.getCommentId());
    if (isDeleted) {
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}
