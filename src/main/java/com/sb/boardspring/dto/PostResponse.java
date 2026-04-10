package com.sb.boardspring.dto;

public class PostResponse {

    private Long id;
    private String title;
    private String content;
    private Long userId;
    private String userName;

    public PostResponse(Long id, String title, String content, Long userId, String userName){
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.userName = userName;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

}
