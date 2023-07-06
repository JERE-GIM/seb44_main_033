package com.cinemaprincess.auth.userdetails;

import com.cinemaprincess.auth.utils.CustomAuthorityUtils;
import com.cinemaprincess.exception.BusinessLogicException;
import com.cinemaprincess.exception.ExceptionCode;
import com.cinemaprincess.user.entity.User;
import com.cinemaprincess.user.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class UsersDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final CustomAuthorityUtils customAuthorityUtils;

    public UsersDetailsService(UserRepository userRepository, CustomAuthorityUtils customAuthorityUtils) {
        this.userRepository = userRepository;
        this.customAuthorityUtils = customAuthorityUtils;
    }

    // 유저 이름(username)에 해당하는 정보(email)를 DB 에서 조회하여
    // UserDetails 인터페이스 구현체 객체 리턴
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return new UsersDetails(findUser);
    }

    // UserDetails 인터페이스 구현
    private final class UsersDetails extends User implements UserDetails {
        UsersDetails(User user) {
            setUserId(user.getUserId());
            setEmail(user.getEmail());
            setPassword(user.getPassword());
            setRoles(user.getRoles());
        }

        // User 의 Email 정보를 조회해 User 권한 정보 생성
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return customAuthorityUtils.createAuthorities(this.getEmail());
        }

        // 스프링 시큐리티 Username -> User Entity 의 email 주소를 가르킴
        @Override
        public String getUsername() {
            return getEmail();
        }

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
    }



}
