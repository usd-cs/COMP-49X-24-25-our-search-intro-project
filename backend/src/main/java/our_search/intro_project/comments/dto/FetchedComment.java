package our_search.intro_project.comments.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

public class FetchedComment {
    private final Integer commentId;
    private final String content;
    private final String userName;
    private final LocalDateTime createdAt;

    public FetchedComment(Integer commentId, String content, String userName, LocalDateTime createdAt) {
        this.commentId = commentId;
        this.content = content;
        this.userName = userName;
        this.createdAt = createdAt;
    }

    @JsonProperty("commentId")
    public Integer getCommentId() {
        return commentId;
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
