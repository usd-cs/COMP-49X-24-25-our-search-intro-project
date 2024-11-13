package our_search.intro_project.login.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import our_search.intro_project.login.dto.LoginRequest;
import our_search.intro_project.login.dto.LoginResponse;
import our_search.intro_project.login.service.LoginService;

@RestController
@RequestMapping("/login")
@CrossOrigin
public class LoginController {
  private final LoginService loginService;

  @Autowired
  public LoginController(LoginService loginService) {
    this.loginService = loginService;
  }

  @PostMapping
  public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
    LoginResponse loginResponse =
        loginService.validateLogin(loginRequest.getEmail(), loginRequest.getPassword());
    if (loginResponse.isValid()) {
      return ResponseEntity.ok(loginResponse);
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResponse);
    }
  }
}
