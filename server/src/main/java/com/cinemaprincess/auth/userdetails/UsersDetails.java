package com.cinemaprincess.auth.userdetails;

import com.cinemaprincess.user.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// UserDetails 인터페이스 구현
public class UsersDetails extends User implements UserDetails, OAuth2User {
    private Map<String, Object> attributes;

    // local user
    public UsersDetails(User user) {
        setUserId(user.getUserId());
        setEmail(user.getEmail());
        setPassword(user.getPassword());
        setRoles(user.getRoles());
    }

    // oauth user
    public UsersDetails(User user, Map<String, Object> attributes) {
        setUserId(user.getUserId());
        setUsername(user.getUsername());
        setEmail(user.getEmail());
        setPassword(user.getPassword());
        setRoles(user.getRoles());
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
            return attributes;
        }

    // User 의 Email 정보를 조회해 User 권한 정보 생성
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<String> roles = this.getRoles();
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

    // 스프링 시큐리티 Username -> User Entity 의 email 주소를 가르킴
    @Override
    public String getUsername()  { return getEmail(); }

    @Override
    public boolean isAccountNonExpired() {
            return true;
        }

    @Override
    public boolean isAccountNonLocked() {
            return true;
        }

    @Override
    public boolean isCredentialsNonExpired() {
            return true;
        }

    @Override
    public boolean isEnabled() {
            return true;
        }

    @Override
    public String getName() {
            return null;
        }
}

