package our_search.intro_project.posts.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import our_search.intro_project.database.entities.Post;
import our_search.intro_project.database.services.PostService;
import our_search.intro_project.posts.dto.FetchedPost;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class FetchController {
  private final PostService postService;

  @Autowired
  public FetchController(PostService postService) {
    this.postService = postService;
  }

  @GetMapping
  public List<FetchedPost> getAllPosts() {
    return postService.getAllPosts().stream()
        .map(
            post ->
                new FetchedPost(
                    post.getPostId(),
                    post.getContents(),
                    post.getUser().getName(),
                    post.getCreatedAt()))
        .sorted((post1, post2) -> post2.getCreatedAt().compareTo(post1.getCreatedAt()))
        .toList();
  }
}
