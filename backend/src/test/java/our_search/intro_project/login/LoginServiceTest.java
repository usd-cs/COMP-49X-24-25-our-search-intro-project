package our_search.intro_project.login;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import our_search.intro_project.database.entities.User;
import our_search.intro_project.database.repositories.UserRepository;
import our_search.intro_project.login.dto.LoginResponse;
import our_search.intro_project.login.service.LoginService;

public class LoginServiceTest {
  @Mock
  private UserRepository userRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  @InjectMocks
  private LoginService loginService;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testValidateLogin_validCredentialsNoAdmin_returnsValidResponse() {
    String email = "test@test.com";
    String plainPassword = "password";
    User mockUser = new User();
    mockUser.setEmail(email);
    mockUser.setName("test");
    mockUser.setPassword("encodedPassword");
    mockUser.setUserId(1);
    mockUser.setAdmin(false);

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));
    when(passwordEncoder.matches(plainPassword, mockUser.getPassword())).thenReturn(true);

    LoginResponse response = loginService.validateLogin(email, plainPassword);

    assertEquals("test", response.getUserName());
    assertEquals(1, response.getUserId());
    assertFalse(response.isAdmin());
    assertTrue(response.isValid());
  }

  @Test
  void testValidateLogin_validCredentialsIsAdmin_returnsValidResponse() {
    String email = "test@test.com";
    String plainPassword = "password";
    User mockUser = new User();
    mockUser.setEmail(email);
    mockUser.setName("test");
    mockUser.setPassword("encodedPassword");
    mockUser.setUserId(1);
    mockUser.setAdmin(true);

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));
    when(passwordEncoder.matches(plainPassword, mockUser.getPassword())).thenReturn(true);

    LoginResponse response = loginService.validateLogin(email, plainPassword);

    assertEquals("test", response.getUserName());
    assertEquals(1, response.getUserId());
    assertTrue(response.isAdmin());
    assertTrue(response.isValid());
  }

  @Test
  void testValidateLogin_invalidPassword_returnsInvalidResponse() {
    String email = "test@test.com";
    String plainPassword = "invalidPassword";
    User mockUser = new User();
    mockUser.setEmail(email);
    mockUser.setName("test");
    mockUser.setPassword("encodedPassword");
    mockUser.setUserId(1);
    mockUser.setAdmin(false);

    when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));
    when(passwordEncoder.matches(plainPassword, mockUser.getPassword())).thenReturn(false);

    LoginResponse response = loginService.validateLogin(email, plainPassword);

    assertEquals("", response.getUserName());
    assertEquals(-1, response.getUserId());
    assertFalse(response.isAdmin());
    assertFalse(response.isValid());
  }

  @Test
  void testValidateLogin_emailDoesNotExist_returnsInvalidResponse() {
    String email = "doesnotextist@test.com";
    String plainPassword = "password";
    when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

    LoginResponse response = loginService.validateLogin(email, plainPassword);

    assertEquals("", response.getUserName());
    assertEquals(-1, response.getUserId());
    assertFalse(response.isValid());
  }
}
