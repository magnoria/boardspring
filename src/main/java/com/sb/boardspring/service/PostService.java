package com.sb.boardspring.service;

import com.sb.boardspring.dto.PostRequest;
import com.sb.boardspring.dto.PostResponse;
import com.sb.boardspring.entity.Post;
import com.sb.boardspring.entity.User;
import com.sb.boardspring.jwt.JwtUtil;
import com.sb.boardspring.repository.PostRepository;
import com.sb.boardspring.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    //  토큰 확인
    private Long extractUserIdFromHeader(String authorizationHeader){
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")){
            throw new IllegalArgumentException("토큰이 없거나 형식이 올바르지 않습니다.");
        }

        String token = authorizationHeader.substring(7);
        return jwtUtil.getUserId(token);
    }

    // 글 수정 삭제 확인 함수
    private void validateOwner(Post post, Long userId){
        //System.out.println("post user id = " + post.getUser().getId());
        //System.out.println("token user id = " + userId);

        if (!post.getUser().getId().equals(userId)){
            throw new IllegalArgumentException("본인 글만 수정 또는 삭제할 수 있습니다..");
        }
    }



    // 생성
    public PostResponse createPost(PostRequest request, String authorizationHeader){
        //System.out.println("확인"+authorizationHeader);
       Long userId = extractUserIdFromHeader(authorizationHeader);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        Post post = new Post(
                request.getTitle(),
                request.getContent(),
                user
        );

        Post savePost = postRepository.save(post);

        return PostResponse.from(savePost);
    }

    // 전체 출력
    public List<PostResponse> getAllPosts(){
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(PostResponse::from)
                .toList();
    }

    //하나 출력
    public PostResponse getPost(Long postId){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        return PostResponse.from(post);
    }

    // 수정
    public PostResponse udatePost(Long postId, PostRequest request, String authorizationHeader){
        Long userId = extractUserIdFromHeader(authorizationHeader);

        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        validateOwner(post, userId);

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());

        Post updatePost = postRepository.save(post);

        return PostResponse.from(updatePost);
    }

    // 삭제
    public void deletePost(Long postId, String authorizationHeader){
        Long userId = extractUserIdFromHeader(authorizationHeader);

        Post post = postRepository.findById(postId).orElseThrow(()-> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        validateOwner(post, userId);

        postRepository.delete(post);
    }

}
