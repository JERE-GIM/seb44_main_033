package com.cinemaprincess.auth.handler;

import java.io.IOException;
import java.net.URI;
import java.util.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.cinemaprincess.auth.userdetails.OAuth2UserDetailsService;
import com.cinemaprincess.auth.userdetails.UsersDetails;
import com.cinemaprincess.auth.utils.CustomAuthorityUtils;
import com.cinemaprincess.auth.jwt.JwtTokenProvider;

import com.cinemaprincess.user.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        redirect(request, response, authentication);
    }

    private void redirect(HttpServletRequest request,
                          HttpServletResponse response,
                          Authentication authentication) throws IOException {
        String accessToken = delegateAccessToken(authentication);
        String refreshToken = delegateRefreshToken(authentication);

        String uri = createURI(accessToken, refreshToken).toString();

        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(Authentication authentication) {
        UsersDetails usersDetails = (UsersDetails) authentication.getPrincipal();

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", usersDetails.getEmail());
        claims.put("roles", usersDetails.getRoles());

        String subject = usersDetails.getEmail();
        Date expiration = jwtTokenProvider.getTokenExpiration(jwtTokenProvider.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenProvider.encodeBase64SecretKey(jwtTokenProvider.getSecretKey());
        String accessToken = jwtTokenProvider.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Authentication authentication) {
        UsersDetails usersDetails = (UsersDetails) authentication.getPrincipal();

        String subject = usersDetails.getEmail();
        Date expiration = jwtTokenProvider.getTokenExpiration(jwtTokenProvider.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenProvider.encodeBase64SecretKey(jwtTokenProvider.getSecretKey());
        String refreshToken = jwtTokenProvider.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .fromUriString("http://localhost:8080")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
