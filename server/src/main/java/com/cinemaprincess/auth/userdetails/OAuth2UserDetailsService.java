package com.cinemaprincess.auth.userdetails;

import java.util.*;

import com.cinemaprincess.auth.userInfo.GoogleUserInfo;
import com.cinemaprincess.auth.userInfo.KakaoUserInfo;
import com.cinemaprincess.auth.userInfo.NaverUserInfo;
import com.cinemaprincess.auth.userInfo.OAuth2UserInfo;
import com.cinemaprincess.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.cinemaprincess.user.entity.User;
import com.cinemaprincess.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class OAuth2UserDetailsService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // Access Token 을 이용해 써드 파티 서버로부터 사용자 정보를 받아옴
        OAuth2User oAuth2User = super.loadUser(userRequest);

        OAuth2UserInfo oAuth2UserInfo = null;

        // GOOGLE, KAKAO, NAVER
        String provider = userRequest.getClientRegistration().getRegistrationId().toUpperCase();

        switch (provider) {
            case "GOOGLE":
                oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
                break;

            case "KAKAO":
                oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
                break;

            case "NAVER":
                oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttributes());
                break;
        }

        String providerId = oAuth2UserInfo.getProviderId();
        String email = oAuth2UserInfo.getEmail();
        String password = passwordEncoder.encode(UUID.randomUUID().toString().substring(0, 5)); // random password 암호화
        String username = provider+"_"+providerId; // username 중복 방지
        List<String> roles = customAuthorityUtils.createRoles(email);

        // DB 에 존재하지 않는 Email 이라면 회원가입 처리
        Optional<User> findUser = userRepository.findByEmail(email);
        User user = findUser.orElseGet(() -> new User(email, password, username, roles, provider));
        userRepository.save(user);

        return new UsersDetails(user, oAuth2User.getAttributes());
    }
}
