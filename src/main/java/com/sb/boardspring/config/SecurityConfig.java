package com.sb.boardspring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/signup" , "/api/users/login").permitAll()
                        //.anyRequest().authenticated()
                        .anyRequest().permitAll()
                )
                .formLogin(form->form.disable())
                .httpBasic(httpBasic -> httpBasic.disable());//시큐리티 기본로그인 사용하지 않음
        return http.build();
    }
}
