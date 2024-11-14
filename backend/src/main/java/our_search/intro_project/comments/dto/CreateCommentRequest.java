package our_search.intro_project.comments.dto;

import jakarta.validation.constraints.NotNull;

public class CreateCommentRequest {

  @NotNull(message = "User ID is required.")
  private Integer userId;

  @NotNull(message = "Post ID is required.")
  private Integer postId;

  private String content;

  public CreateCommentRequest(Integer userId, Integer postId, String content) {
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public Integer getPostId() {
    return postId;
  }

  public void setPostId(Integer postId) {
    this.postId = postId;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
