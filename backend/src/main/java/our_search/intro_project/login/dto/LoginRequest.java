package our_search.intro_project.login.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public class LoginRequest {

  @NotNull(message = "Email cannot be null")
  @Email(message = "Email should be valid")
  private String email;

  @NotNull(message = "Password cannot be null")
  private String password;

  public LoginRequest(String email, String password) {
    this.email = email;
    this.password = password;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
