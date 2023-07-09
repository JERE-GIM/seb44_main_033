package com.cinemaprincess.auth.filter;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.cinemaprincess.auth.dto.LoginDto;
import com.cinemaprincess.auth.jwt.JwtTokenProvider;
import com.cinemaprincess.user.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

// 클라이언트 요청 시 JWT 인증을 하기 위해 설치하는 커스텀 필터
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

@SneakyThrows
@Override
public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

    ObjectMapper objectMapper = new ObjectMapper();
    LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

    UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

    return authenticationManager.authenticate(authenticationToken);
}

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) {
        User user = (User) authResult.getPrincipal();

        String accessToken = delegateAccessToken(user);
        String refreshToken = delegateRefreshToken(user);

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
    }

    private String delegateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getEmail());
        claims.put("roles", user.getRoles());

        String subject = user.getEmail();
        Date expiration = jwtTokenProvider.getTokenExpiration(jwtTokenProvider.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenProvider.encodeBase64SecretKey(jwtTokenProvider.getSecretKey());

        String accessToken = jwtTokenProvider.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(User user) {
        String subject = user.getEmail();
        Date expiration = jwtTokenProvider.getTokenExpiration(jwtTokenProvider.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenProvider.encodeBase64SecretKey(jwtTokenProvider.getSecretKey());

        String refreshToken = jwtTokenProvider.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
