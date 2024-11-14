package our_search.intro_project.posts;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import our_search.intro_project.database.entities.Post;
import our_search.intro_project.database.entities.User;
import our_search.intro_project.database.services.PostService;
import our_search.intro_project.database.services.UserService;
import our_search.intro_project.posts.controller.CreateController;
import our_search.intro_project.posts.dto.CreatePostRequest;
import our_search.intro_project.posts.dto.FetchedPost;

@WebMvcTest(controllers = CreateController.class)
public class CreateControllerTest {

  private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
  @Autowired private MockMvc mockMvc;
  @MockBean private PostService postService;
  @MockBean private UserService userService;

  @BeforeEach
  void setUp() {
    objectMapper.registerModule(new JavaTimeModule());
    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
  }

  @Test
  void testCreatedPos_validRequest_returnsCreatedPost() throws Exception {
    User user = new User("test@test.com", "test", false, "password");
    LocalDateTime createdAt = LocalDateTime.of(2000, 1, 1, 1, 1);

    Post savedPost = new Post("test post", user);
    savedPost.setPostId(1);
    savedPost.setCreatedAt(createdAt);

    when(userService.getUserById(1)).thenReturn(Optional.of(user));
    when(postService.createPost(any(Post.class))).thenReturn(savedPost);

    CreatePostRequest request = new CreatePostRequest(1, "test post");
    FetchedPost expectedResponse = new FetchedPost(1, "test post", "test", createdAt);

    mockMvc
        .perform(
            post("/create/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isCreated())
        .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse), true));
  }
}
