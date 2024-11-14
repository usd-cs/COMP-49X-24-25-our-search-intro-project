package our_search.intro_project.comments;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import our_search.intro_project.comments.controller.DeleteController;
import our_search.intro_project.comments.dto.DeleteCommentRequest;
import our_search.intro_project.database.entities.User;
import our_search.intro_project.database.services.CommentService;
import our_search.intro_project.database.services.UserService;

@WebMvcTest(controllers = DeleteController.class)
public class DeleteControllerTest {
  @Autowired
  private MockMvc mockMvc;
  @MockBean
  private CommentService commentService;
  @MockBean
  private UserService userService;
  private final ObjectMapper objectMapper = new ObjectMapper();

  @Test
  void testDeleteComment_adminUser_commentDeletedSuccessfully() throws Exception {
    User adminUser = new User("admin@admin.com", "admin", true, "password");

    when(userService.getUserById(1)).thenReturn(Optional.of(adminUser));
    when(commentService.deleteComment(1)).thenReturn(true);

    DeleteCommentRequest request = new DeleteCommentRequest(1, 1);

    mockMvc
        .perform(delete("/delete/comment")
                     .contentType(MediaType.APPLICATION_JSON)
                     .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isNoContent());
  }

  @Test
  void testDeleteComment_nonAdminUser_forbidden() throws Exception {
    User regularUser = new User("user@user.com", "user", false, "password");

    when(userService.getUserById(1)).thenReturn(Optional.of(regularUser));

    DeleteCommentRequest request = new DeleteCommentRequest(1, 1);

    mockMvc
        .perform(delete("/delete/comment")
                     .contentType(MediaType.APPLICATION_JSON)
                     .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isForbidden());
  }
}
