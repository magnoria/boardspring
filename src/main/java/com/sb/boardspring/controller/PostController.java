package com.sb.boardspring.controller;

import com.sb.boardspring.dto.PostRequest;
import com.sb.boardspring.dto.PostResponse;
import com.sb.boardspring.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    //
    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest request, @RequestHeader("Authorization") String authorizationHeader){
        PostResponse response = postService.createPost(request, authorizationHeader);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
