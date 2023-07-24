package com.cinemaprincess.user.service;

import java.io.File;
import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

import com.cinemaprincess.genre.repository.GenreRepository;
import com.cinemaprincess.user.dto.UserStatisticsDto;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cinemaprincess.auth.utils.CustomAuthorityUtils;
import com.cinemaprincess.user.entity.User;
import com.cinemaprincess.user.repository.UserRepository;
import com.cinemaprincess.exception.BusinessLogicException;
import com.cinemaprincess.exception.ExceptionCode;
import org.springframework.web.multipart.MultipartFile;


@Service
@RequiredArgsConstructor
public class UserService {
    private final CustomAuthorityUtils customAuthorityUtils;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;
    @Value("${file.path}")
    private String uploadPath;

    // 회원가입
    public User createUser(User user) {
        // 중복 메일, 닉네임 확인
        this.verifyExistsEmail(user.getEmail());
        this.verifyExistsUsername(user.getUsername());

        // password 암호화
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        // 사용자 권한 설정
        List<String> roles = customAuthorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        // local 회원가입 user
        user.setProvider("LOCAL");

        // 기본 프로필 이미지 설정
        user.setProfileImgPath(uploadPath + "default_image.png");
        user.setProfileImgName("default_image.png");

        return userRepository.save(user);
    }

    // 회원정보 수정
    public User updateUser(User user) {
        User findUser = this.findVerifiedUser(user.getUserId());

        // 현재 user 의 닉네임이거나 중복되지 않은 닉네임 일때만 수정가능
        if(findUser.getUsername().equals(user.getUsername())) {
            Optional.ofNullable(user.getUsername())
                    .ifPresent(userName -> findUser.setUsername(userName));
        } else {
            this.verifyExistsUsername(user.getUsername());
            Optional.ofNullable(user.getUsername())
                    .ifPresent(userName -> findUser.setUsername(userName));
        }
        Optional.ofNullable(user.getAge())
                .ifPresent(age -> findUser.setAge(age));
        Optional.ofNullable(user.getGenre())
                .ifPresent(genre -> findUser.setGenre(genre));

        return userRepository.save(findUser);
    }

    // password 수정
    public User updatePasswordToUser(User user, String newPassword) {
        User findUser = this.findVerifiedUser(user.getUserId());
        String currentPassword = findUser.getPassword(); // DB에 저장된 비밀번호
        String checkPassword = user.getPassword(); // 입력받은 현재 비밀번호
        String changePassword = newPassword; // 입력받은 새로운 비밀번호

        // DB 에 저장된 현재 user 의 비밀번호와 입력받은 현재 비밀번호가 일치한다면 비밀번호 수정, 틀릴 시 예외처리
        if(passwordEncoder.matches(checkPassword, currentPassword)) {
            String encryptedChangePassword = passwordEncoder.encode(changePassword);
            Optional.ofNullable(user.getPassword())
                    .ifPresent(password -> findUser.setPassword(encryptedChangePassword));
            return userRepository.save(findUser);
        } else {
            throw new BusinessLogicException(ExceptionCode.USER_INVALID_PASSWORD);
        }
    }

    // 회원 조회
    public User findUser(Long userId) {
        return this.findVerifiedUser(userId);
    }

    // 회원 탈퇴
    public void deleteUser(Long userId) {
        User user = this.findVerifiedUser(userId);

        userRepository.delete(user);
    }

    // 프로필 이미지 업로드
    public void uploadImgFile(User user, MultipartFile imgFile) throws IOException {
        UUID uuid = UUID.randomUUID();
        String fileName = uuid.toString() + "_" + imgFile.getOriginalFilename();
        File profileImg = new File(uploadPath, fileName);
        imgFile.transferTo(profileImg);
        user.setProfileImgName(fileName);
        user.setProfileImgPath(uploadPath+fileName);

        userRepository.save(user);
    }

    public byte[] getImgFile(User user) throws IOException {
        if(user.getProfileImgPath() == null) {
            return null;
        } else {
            String imagePath = user.getProfileImgPath();
            Path path = Paths.get(imagePath);

            byte[] imageBytes = Files.readAllBytes(path);

            return imageBytes;
        }
    }

    // 중복된 이메일인지 확인
    private void verifyExistsEmail(String email) {
        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.USER_EMAIL_EXISTS);
        }
    }

    // 중복된 닉네임인지 확인
    private void verifyExistsUsername(String username) {
        Optional<User> optional = userRepository.findByUsername(username);
        if (optional.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.USER_USERNAME_EXISTS);
        }
    }

    // 존재하는 회원인지 확인
    private User findVerifiedUser(Long userId) {
        Optional<User> optional = userRepository.findById(userId);
        User findUser = optional
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return findUser;
    }

    /*
        파라미터로 받은 성별, 연령대의 사용자들의 선호 장르를 리턴
     */

    public Map<String, Integer> getUsersStatistics(String gender, String age) {
        int minAge = this.calculateMinAge(age);
        int maxAge = this.calculateMaxAge(age);
        User.Gender genderEnum = User.Gender.valueOf(gender);

        List<UserStatisticsDto> allUsersGenre = userRepository.findByAgeRangeAndGender(genderEnum, minAge, maxAge).stream()
                .map(user -> new UserStatisticsDto(user.getGenre()))
                .collect(Collectors.toList());

        Map<String, Integer> genreCount = new HashMap<>();

        for (UserStatisticsDto userStatistics : allUsersGenre) {
            for (String genreName : userStatistics.getGenreNames()) {
                genreCount.put(genreName, genreCount.getOrDefault(genreName, 0) + 1);
            }
        }

        return genreCount;
    }

    private int calculateMinAge(String age){
        int ageGroup = Integer.parseInt(age);
        return ageGroup / 10 * 10;
    }

    private int calculateMaxAge(String age){
        int ageGroup = Integer.parseInt(age);
        return (ageGroup / 10 * 10) + 9;
    }

}
