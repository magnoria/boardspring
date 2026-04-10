package com.sb.boardspring.service;

import com.sb.boardspring.dto.PostRequest;
import com.sb.boardspring.dto.PostResponse;
import com.sb.boardspring.entity.Post;
import com.sb.boardspring.entity.User;
import com.sb.boardspring.jwt.JwtUtil;
import com.sb.boardspring.repository.PostRepository;
import com.sb.boardspring.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public PostService(PostRepository postRepository, UserRepository userRepository, JwtUtil jwtUtil){
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public PostResponse createPost(PostRequest request, String authorizationHeader){
        //System.out.println("확인"+authorizationHeader);
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")){
            throw new IllegalArgumentException("토큰이 없거나 형식이 올바르지 않습니다.");
        }

        String token = authorizationHeader.substring(7);
        Long userId = jwtUtil.getUserId(token);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        Post post = new Post(
                request.getTitle(),
                request.getContent(),
                user
        );

        Post savePost = postRepository.save(post);

        return new PostResponse(
                savePost.getId(),
                savePost.getTitle(),
                savePost.getContent(),
                savePost.getUser().getId(),
                savePost.getUser().getName()
        );
    }
}
