package our_search.intro_project.posts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

public class FetchedPost {
  private final int postId;
  private final String content;
  private final String userName;
  private final LocalDateTime createdAt;

  public FetchedPost(int postId, String content, String userName, LocalDateTime createdAt) {
    this.postId = postId;
    this.content = content;
    this.userName = userName;
    this.createdAt = createdAt;
  }

  @JsonProperty("postId")
  public int getPostId() {
    return postId;
  }

  @JsonProperty("content")
  public String getContent() {
    return content;
  }

  @JsonProperty("userName")
  public String getUserName() {
    return userName;
  }

  @JsonProperty("createdAt")
  public LocalDateTime getCreatedAt() {
    return createdAt;
  }
}
