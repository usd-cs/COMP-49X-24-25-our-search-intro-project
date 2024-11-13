package our_search.intro_project.login.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginResponse {
  private final String userName;
  private final int userId;
  private final boolean isAdmin;
  private final boolean isValid;

  public LoginResponse(String userName, int userId, boolean isValid, boolean isAdmin) {
    this.userName = userName;
    this.userId = userId;
    this.isValid = isValid;
    this.isAdmin = isAdmin;
  }

  @JsonProperty("userName")
  public String getUserName() {
    return userName;
  }

  @JsonProperty("userId")
  public int getUserId() {
    return userId;
  }

  @JsonProperty("isValid")
  public boolean isValid() {
    return isValid;
  }

  @JsonProperty("isAdmin")
  public boolean isAdmin() {
    return isAdmin;
  }
}
