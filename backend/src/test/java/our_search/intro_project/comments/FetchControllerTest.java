package our_search.intro_project.comments;

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
import our_search.intro_project.comments.dto.GetCommentRequest;
import our_search.intro_project.database.entities.Comment;
import our_search.intro_project.database.entities.Post;
import our_search.intro_project.database.entities.User;
import our_search.intro_project.database.services.CommentService;
import our_search.intro_project.comments.controller.FetchController;
import our_search.intro_project.comments.dto.FetchedComment;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = FetchController.class)
public class FetchControllerTest {

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
    @Autowired private MockMvc mockMvc;
    @MockBean private CommentService commentService;

    @BeforeEach
    void setUp() {
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Test
    void testFetchCommentsByPostId_existingComments_returnsSortedResponse() throws Exception {

        User user = new User("test@test.com", "testUser", false, "password");
        Post post = new Post("Post content", user);
        post.setPostId(1);

        LocalDateTime olderDate = LocalDateTime.of(2000, 1, 1, 1, 1);
        LocalDateTime newerDate = LocalDateTime.of(2001, 1, 1, 1, 1);

        Comment comment1 = new Comment("Comment 1", user, post);
        comment1.setCommentId(1);
        comment1.setCreatedAt(olderDate);

        Comment comment2 = new Comment("Comment 2", user, post);
        comment2.setCommentId(2);
        comment2.setCreatedAt(newerDate);

        List<FetchedComment> expectedComments =
                Arrays.asList(
                        new FetchedComment(2, "Comment 2", "testUser", newerDate),
                        new FetchedComment(1, "Comment 1", "testUser", olderDate));

        List<Comment> mockComments = Arrays.asList(comment1, comment2);
        when(commentService.getCommentsByPostId(1)).thenReturn(mockComments);

        GetCommentRequest request = new GetCommentRequest(1);

        mockMvc
                .perform(post("/comment").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(expectedComments), true));
    }

    @Test
    void testFetchCommentsByPostId_noComments_returnsEmptyResponse() throws Exception {
        when(commentService.getCommentsByPostId(1)).thenReturn(List.of());

        GetCommentRequest request = new GetCommentRequest(1);

        mockMvc
                .perform(
                        post("/comment")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}

