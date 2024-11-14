package our_search.intro_project.database.comments.dto;

public class GetCommentRequest {
    private Integer postId;

    public GetCommentRequest() {}

    public GetCommentRequest(Integer postId) {
        this.postId = postId;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }
}
