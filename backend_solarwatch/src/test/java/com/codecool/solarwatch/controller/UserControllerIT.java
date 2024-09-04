package com.codecool.solarwatch.controller;

import com.codecool.solarwatch.model.entity.UserEntity;
import com.codecool.solarwatch.model.user.CreateUserRequest;
import com.codecool.solarwatch.model.user.Role;
import com.codecool.solarwatch.model.user.UserRequest;
import com.codecool.solarwatch.repository.UserRepository;
import com.codecool.solarwatch.security.jwt.JwtUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-IT.properties")
@ComponentScan(basePackages = "com.codecool.solarwatch")
public class UserControllerIT {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setup() {
        userRepository.deleteAll();
        UserEntity user = new UserEntity();
        user.setUsername("test1");
        user.setPassword(passwordEncoder.encode("test"));
        user.setRole(Role.ROLE_USER);
        userRepository.save(user);
    }
    @Test
    public void sendSignUpRequestAndItReturnsCreatedStatus() throws Exception {
        CreateUserRequest newUserRequest = new CreateUserRequest("test2", "test2");
        mockMvc.perform(post("/user/register")
                .content(objectMapper.writeValueAsString(newUserRequest))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(roles = "USER")
    public void loginUser() throws Exception {
        UserRequest userRequest = new UserRequest("test1", "test");
        mockMvc.perform(post("/user/login")
        .content(objectMapper.writeValueAsString(userRequest))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void SignUpRequestAndItIsSuccessfullySavedToDb() throws Exception {
        CreateUserRequest newUserRequest = new CreateUserRequest("test3", "test3");
        mockMvc.perform(post("/user/register")
        .content(objectMapper.writeValueAsString(newUserRequest))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
        UserEntity user = userRepository.findByUsername("test3").get();
        assertEquals(newUserRequest.username(), user.getUsername());
    }
}
