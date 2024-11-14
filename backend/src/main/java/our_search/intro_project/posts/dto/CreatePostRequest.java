package our_search.intro_project.posts.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class CreatePostRequest {

  @NotNull(message = "User ID is required.")
  private Integer userId;

  private String content;

  public CreatePostRequest() {}

  public CreatePostRequest(Integer userId, String content) {
    this.userId = userId;
    this.content = content;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
