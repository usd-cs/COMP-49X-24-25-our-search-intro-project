package our_search.intro_project.comments;

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
import our_search.intro_project.comments.controller.CreateCommentController;
import our_search.intro_project.comments.dto.CreateCommentRequest;
import our_search.intro_project.comments.dto.FetchedComment;
import our_search.intro_project.database.entities.Comment;
import our_search.intro_project.database.entities.Post;
import our_search.intro_project.database.entities.User;
import our_search.intro_project.database.services.CommentService;
import our_search.intro_project.database.services.PostService;
import our_search.intro_project.database.services.UserService;

@WebMvcTest(controllers = CreateCommentController.class)
public class CreateCommentControllerTest {

  private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
  @Autowired
  private MockMvc mockMvc;
  @MockBean
  private CommentService commentService;
  @MockBean
  private PostService postService;
  @MockBean
  private UserService userService;

  @BeforeEach
  void setUp() {
    objectMapper.registerModule(new JavaTimeModule());
    objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
  }

  @Test
  void testCreateComment_validRequest_returnsCreatedPost() throws Exception {
    User user = new User("test@test.com", "test", false, "password");
    Post post = new Post("content", user);
    post.setPostId(1);
    LocalDateTime createdAt = LocalDateTime.of(2000, 1, 1, 1, 1);

    Comment savedComment = new Comment("test comment", user, post);
    savedComment.setCommentId(1);
    savedComment.setCreatedAt(createdAt);

    when(userService.getUserById(1)).thenReturn(Optional.of(user));
    when(postService.getPostById(1)).thenReturn(Optional.of(post));
    when(commentService.createComment(any(Comment.class))).thenReturn(savedComment);

    CreateCommentRequest request = new CreateCommentRequest(1, 1, "test comment");
    FetchedComment expectedResponse = new FetchedComment(1, "test comment", "test", createdAt);

    mockMvc
        .perform(post("/create/comment")
                     .contentType(MediaType.APPLICATION_JSON)
                     .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isCreated())
        .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse), true));
  }

}
