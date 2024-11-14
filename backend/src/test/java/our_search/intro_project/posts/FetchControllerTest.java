package our_search.intro_project.posts;

import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
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
import our_search.intro_project.posts.controller.FetchController;
import our_search.intro_project.posts.dto.FetchedPost;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = FetchController.class)
public class FetchControllerTest {

  private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
  @Autowired private MockMvc mockMvc;
  @MockBean private PostService postService;

  @BeforeEach
  void setUp() {
    objectMapper.registerModule(new JavaTimeModule());
    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
  }

  @Test
  void testFetchAllPosts_returnsSortedResponse() throws Exception {
    User user = new User("test@test.com", "test", false, "password");

    LocalDateTime olderDate = LocalDateTime.of(2000, 1, 1, 1, 1);
    LocalDateTime newerDate = LocalDateTime.of(2001, 1, 1, 1, 1);

    Post post1 = new Post("Post 1", user);
    post1.setCreatedAt(olderDate);
    post1.setPostId(1);

    Post post2 = new Post("Post 2", user);
    post2.setCreatedAt(newerDate);
    post2.setPostId(2);

    List<FetchedPost> expectedPosts =
        Arrays.asList(
            new FetchedPost(2, "Post 2", "test", newerDate),
            new FetchedPost(1, "Post 1", "test", olderDate));

    List<Post> mockPosts = Arrays.asList(post1, post2);
    when(postService.getAllPosts()).thenReturn(mockPosts);

    mockMvc
        .perform(get("/posts").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(expectedPosts), true));
  }

  @Test
  void testFetchAllPosts_noPosts_returnsEmptyResponse() throws Exception {
    when(postService.getAllPosts()).thenReturn(List.of());

    mockMvc
        .perform(get("/posts").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().json("[]"));
  }
}
