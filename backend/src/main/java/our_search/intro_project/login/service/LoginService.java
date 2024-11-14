package our_search.intro_project.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import our_search.intro_project.database.entities.User;
import our_search.intro_project.database.repositories.UserRepository;
import our_search.intro_project.login.dto.LoginResponse;

import java.util.Optional;

@Service
public class LoginService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public LoginService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public LoginResponse validateLogin(String email, String plainPassword) {
    Optional<User> userOptional = userRepository.findByEmail(email);

    if (userOptional.isPresent()) {
      User user = userOptional.get();
      if (passwordEncoder.matches(plainPassword, user.getPassword())) {
        return new LoginResponse(user.getName(), user.getUserId(), true, user.getAdmin());
      }
    }

    return new LoginResponse("", -1, false, false);
  }
}
