package com.sb.boardspring.controller;

import com.sb.boardspring.dto.PostRequest;
import com.sb.boardspring.dto.PostResponse;
import com.sb.boardspring.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    // 게시글 생성
    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest request, @RequestHeader("Authorization") String authorizationHeader){
        PostResponse response = postService.createPost(request, authorizationHeader);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 전체 출력
    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts(){
        List<PostResponse> response = postService.getAllPosts();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 개별 출력
    @GetMapping("/{postId}") // url로 구별후 출력, 수정, 삭제
    public ResponseEntity<PostResponse> getPost(@PathVariable Long postId){
        PostResponse response = postService.getPost(postId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    //수정
    @PutMapping("/{postId}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable Long postId, @RequestBody PostRequest request, @RequestHeader("Authorization") String authorizationHeader){
        PostResponse response = postService.udatePost(postId, request, authorizationHeader);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    //삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId, @RequestHeader("Authorization") String authorizationHeader){
        postService.deletePost(postId, authorizationHeader);
        return ResponseEntity.ok("삭제 완료");
    }



}
