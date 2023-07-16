package com.cinemaprincess.auth.utils;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {
    // admin 계정 임의 지정, 수정 필요함
    private String adminMailAddress = "admin@gmail.com";

    // 사용자 및 관리자 권한 목록 생성
    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER");
    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");
    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
    private final List<String> USER_ROLES_STRING = List.of("USER");

    // 메모리 상의 Role 기반 권한 정보 생성
    public List<GrantedAuthority> createAuthorities(String email) {
        if (email.equals(adminMailAddress)) {
            return ADMIN_ROLES;
        }
        return USER_ROLES;
    }

    // DB 저장된 Role 기반 권한 정보 생성
    public List<GrantedAuthority> createAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
        return authorities;
    }

    public List<String> createRoles(String email) {
        if (email.equals(adminMailAddress)) {
            return ADMIN_ROLES_STRING;
        }
        return USER_ROLES_STRING;
    }
}
