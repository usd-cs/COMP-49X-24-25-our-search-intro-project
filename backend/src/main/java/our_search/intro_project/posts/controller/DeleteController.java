package our_search.intro_project.posts.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import our_search.intro_project.database.entities.User;
import our_search.intro_project.database.services.PostService;
import our_search.intro_project.database.services.UserService;
import our_search.intro_project.posts.dto.DeletePostRequest;

@RestController
@RequestMapping("/delete/post")
@CrossOrigin(origins = "http://localhost:3000")
public class DeleteController {

  private final PostService postService;
  private final UserService userService;

  @Autowired
  public DeleteController(PostService postService, UserService userService) {
    this.postService = postService;
    this.userService = userService;
  }

  @DeleteMapping
  public ResponseEntity<Void> deletePost(@Valid @RequestBody DeletePostRequest deletePostRequest) {
    User user = userService.getUserById(deletePostRequest.getUserId()).orElseThrow(() -> new IllegalArgumentException("User not found."));

    if (!user.getAdmin()) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    boolean isDeleted = postService.deletePost(deletePostRequest.getPostId());
    if (isDeleted) {
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}
