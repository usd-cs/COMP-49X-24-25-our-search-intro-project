package our_search.intro_project.posts.controller;

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
import our_search.intro_project.database.entities.Post;
import our_search.intro_project.database.entities.User;
import our_search.intro_project.database.services.PostService;
import our_search.intro_project.database.services.UserService;
import our_search.intro_project.posts.dto.CreatePostRequest;
import our_search.intro_project.posts.dto.FetchedPost;

@RestController
@RequestMapping("/create/post")
@CrossOrigin(origins = "http://localhost:3000")
public class CreateController {

  private final PostService postService;
  private final UserService userService;

  @Autowired
  public CreateController(PostService postService, UserService userService) {
    this.postService = postService;
    this.userService = userService;
  }

  @PostMapping
  public ResponseEntity<FetchedPost> createPost(@Valid @RequestBody CreatePostRequest request) {
    User user = userService.getUserById(request.getUserId())
        .orElseThrow(() -> new IllegalArgumentException("User not found"));
    Post newPost = new Post(request.getContent(), user);
    newPost.setCreatedAt(LocalDateTime.now());
    Post savedPost = postService.createPost(newPost);

    FetchedPost response = new FetchedPost(
        savedPost.getPostId(),
        savedPost.getContents(),
        savedPost.getUser().getName(),
        savedPost.getCreatedAt()
    );
    return new ResponseEntity<>(response,
                                HttpStatus.CREATED);
  }
}
