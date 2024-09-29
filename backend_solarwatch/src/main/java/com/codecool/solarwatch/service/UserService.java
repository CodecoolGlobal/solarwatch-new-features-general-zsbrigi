package com.codecool.solarwatch.service;

import com.codecool.solarwatch.exception.UsernameAlreadyExistsException;
import com.codecool.solarwatch.model.dto.UserDTO;
import com.codecool.solarwatch.model.entity.UserEntity;
import com.codecool.solarwatch.model.user.CreateUserRequest;
import com.codecool.solarwatch.model.user.JwtResponse;
import com.codecool.solarwatch.model.user.Role;
import com.codecool.solarwatch.model.user.UserRequest;
import com.codecool.solarwatch.repository.UserRepository;
import com.codecool.solarwatch.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static java.lang.String.format;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public void registerUser(CreateUserRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new UsernameAlreadyExistsException(format("user %s already exists", request.username()));
        }
        UserEntity user = new UserEntity();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(Role.ROLE_USER);
        userRepository.save(user);
    }

    public JwtResponse LoginUser(UserRequest user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.username(), user.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        User userDetails = (User) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        return new JwtResponse(jwt, userDetails.getUsername(), roles);
    }

    public void changeUserRoleToAdmin(String username) {
        UserEntity admin = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(format("user %s not found", username)));
        admin.setRole(Role.ROLE_ADMIN);
        userRepository.save(admin);
    }

    public List<UserDTO> getAllUser() {
        List<UserEntity> users = userRepository.findAll();
        return users.stream().map(this::convertUserToDTO).toList();
    }

    @Transactional
    public void deleteUser(String username) {
        userRepository.deleteByUsername(username);
    }

    private UserDTO convertUserToDTO(UserEntity user) {
        return new UserDTO(user.getUsername(), user.getRole());
    }
}
