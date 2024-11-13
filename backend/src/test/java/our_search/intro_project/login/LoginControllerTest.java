package our_search.intro_project.login;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import our_search.intro_project.login.controller.LoginController;
import our_search.intro_project.login.dto.LoginRequest;
import our_search.intro_project.login.dto.LoginResponse;
import our_search.intro_project.login.service.LoginService;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(controllers = LoginController.class)
@ComponentScan(basePackages = "our_search.intro_project.login")
//@Import(LoginControllerTest.TestSecurityConfig.class)
public class LoginControllerTest {

  private final ObjectMapper objectMapper = new ObjectMapper();
  @Autowired
  private MockMvc mockMvc;
  @MockBean
  private LoginService loginService;

  @Test
  void testLogin_validCredentials_returnsOk() throws Exception {
    LoginRequest request = new LoginRequest("test@test.com", "password");
    LoginResponse response = new LoginResponse("test", 1, true, false);

    when(loginService.validateLogin(request.getEmail(), request.getPassword()))
        .thenReturn(response);

    mockMvc
        .perform(
            post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().json(objectMapper.writeValueAsString(response)));
  }

  @Test
  void testLogin_invalidCredentials_returnsUnauthorized() throws Exception {
    LoginRequest request = new LoginRequest("test@test.com", "password");
    LoginResponse response = new LoginResponse("", 0, false, false);

    when(loginService.validateLogin(request.getEmail(), request.getPassword()))
        .thenReturn(response);

    mockMvc
        .perform(
            post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isUnauthorized())
        .andExpect(content().json(objectMapper.writeValueAsString(response)));
  }
}
