package com.cinemaprincess.user.service;

import java.util.List;
import java.util.Optional;

import com.cinemaprincess.statistics.dto.StatisticsDto;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cinemaprincess.auth.utils.CustomAuthorityUtils;
import com.cinemaprincess.user.entity.User;
import com.cinemaprincess.user.repository.UserRepository;
import com.cinemaprincess.exception.BusinessLogicException;
import com.cinemaprincess.exception.ExceptionCode;


@Service
@RequiredArgsConstructor
public class UserService {
    private final CustomAuthorityUtils customAuthorityUtils;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    // 회원가입
    public User createUser(User user) {
        // 중복 메일 확인
        verifyExistsEmail(user.getEmail());

        // password 암호화
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        // 사용자 권한 설정
        List<String> roles = customAuthorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        return userRepository.save(user);
    }

    // 회원정보 수정
    public User updateUser(User user) {
        User findUser = findVerifiedUser(user.getUserId());
        Optional.ofNullable(user.getAge())
                .ifPresent(age -> findUser.setAge(age));
        Optional.ofNullable(user.getUsername())
                .ifPresent(userName -> findUser.setUsername(userName));
        Optional.ofNullable(user.getGenre())
                .ifPresent(genre -> findUser.setGenre(genre));

        return userRepository.save(findUser);
    }

    // password 수정
    public User updatePasswordToUser(User user) {
        User findUser = findVerifiedUser(user.getUserId());
        Optional.ofNullable(user.getPassword())
                .ifPresent(password -> findUser.setPassword(password));

        String encryptedPassword = passwordEncoder.encode(findUser.getPassword());
        findUser.setPassword(encryptedPassword);

        return userRepository.save(findUser);
    }

    // 회원 조회
    public User findUser(Long userId) {
        return findVerifiedUser(userId);
    }

    // 회원 탈퇴
    public void deleteUser(Long userId) {
        User user = findVerifiedUser(userId);

        userRepository.deleteById(userId);
    }

    // 중복된 이메일인지 확인
    private void verifyExistsEmail(String email) {
        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.USER_EMAIL_EXISTS);
        }
    }

    // 존재하는 회원인지 확인
    private User findVerifiedUser(Long userId) {
        Optional<User> optional = userRepository.findById(userId);
        User findUser = optional
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return findUser;
    }

    public StatisticsDto getUsersStatistics() {
        List<User> allUsers = userRepository.findAll();
        System.out.println("findall~");
        for (User user : allUsers){
            System.out.println(user);
        }
        return new StatisticsDto();
    }
}
