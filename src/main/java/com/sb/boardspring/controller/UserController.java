package com.sb.boardspring.controller;

import com.sb.boardspring.dto.LoginRequest;
import com.sb.boardspring.dto.LoginResponse;
import com.sb.boardspring.dto.SignupRequest;
import com.sb.boardspring.dto.SignupResponse;
import com.sb.boardspring.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }
    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<SignupResponse> signup(@RequestBody SignupRequest request){
        SignupResponse response = userService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        LoginResponse response = userService.login(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
