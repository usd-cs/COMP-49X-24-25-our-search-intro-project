package our_search.intro_project.comments.dto;

import jakarta.validation.constraints.NotNull;
import our_search.intro_project.posts.dto.DeletePostRequest;

public class DeleteCommentRequest {

  @NotNull(message = "Comment ID is required")
  private Integer commentId;

  @NotNull(message = "User ID is required")
  private Integer userId;

  public DeleteCommentRequest(Integer commentId, Integer userId) {
    this.commentId = commentId;
    this.userId = userId;
  }

  public Integer getCommentId() {
    return commentId;
  }

  public void setCommentId(Integer commentId) {
    this.commentId = commentId;
  }

  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }
}
