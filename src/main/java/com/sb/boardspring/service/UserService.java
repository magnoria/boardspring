package com.sb.boardspring.service;

import com.sb.boardspring.dto.LoginRequest;
import com.sb.boardspring.dto.LoginResponse;
import com.sb.boardspring.entity.User;
import com.sb.boardspring.dto.SignupRequest;
import com.sb.boardspring.dto.SignupResponse;
import com.sb.boardspring.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }

    //회원가입
    public SignupResponse signup(SignupRequest request){
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
            User user = new User(
                    request.getName(),
                    request.getEmail(),
                    passwordEncoder.encode(request.getPassword())
            );

            User saveUser = userRepository.save(user);

            return new SignupResponse(
                    saveUser.getId(),
                    saveUser.getName(),
                    saveUser.getEmail()
            );
    }

    //로그인
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다."));

        boolean isMatch = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!isMatch) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다.");

        }
        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                "로그인 성공"
        );

    }
}
