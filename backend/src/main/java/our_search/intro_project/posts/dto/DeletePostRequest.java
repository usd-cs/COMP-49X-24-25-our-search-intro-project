package our_search.intro_project.posts.dto;

import jakarta.validation.constraints.NotNull;

public class DeletePostRequest {

  @NotNull(message = "Post ID is required.")
  private Integer postId;

  @NotNull(message = "User ID is required")
  private Integer userId;

  public DeletePostRequest() {}

  public DeletePostRequest(Integer postId, Integer userId) {
    this.postId = postId;
    this.userId = userId;
  }

  public Integer getPostId() {
    return postId;
  }

  public void setPostId(Integer postId) {
    this.postId = postId;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }
}
