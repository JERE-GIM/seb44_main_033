package com.cinemaprincess.user.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.cinemaprincess.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


public class UserDto {

    //회원가입 요청
    @Setter
    @Getter
    public static class Post {
        @NotBlank(message = "이메일을 작성해 주세요.")
        @Email(message = "유효하지 않은 이메일 형식입니다.")
        private String email;

        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$",
                message = "password 길이는 최소 8자 이상 최대 20자 이하, 숫자 1자 이상, 대소문자 구분없이 영문자 1자 이상, 특수문자 1자 이상 입력해 주세요.")
        private String password;

        @NotNull(message = "성별을 선택해 주세요.")
        private User.Gender gender;

        @NotNull(message = "연령대를 선택해 주세요.")
        private Integer age;

        @NotBlank(message = "닉네임을 작성해 주세요.") // unique 옵션 프론트와 상의
        private String username;

        @NotBlank(message = "최소 1개 이상 선택해 주세요.")
        private String genre;

        @NotBlank(message = "최소 1개 이상 선택해 주세요.")
        private String preferredOtt;
    }

    //회원정보 수정
    @Setter
    @Getter
    public static class Patch {
        private Long userId;

        @Email(message = "유효하지 않은 이메일 형식입니다.")
        private String email;

        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$",
                message = "password 길이는 최소 8자 이상 최대 20자 이하, 숫자 1자 이상, 대소문자 구분없이 영문자 1자 이상, 특수문자 1자 이상 입력해 주세요.")
        private String password;

        private Integer age;

        private String username;

        private String genre;

        private String preferredOtt;
    }

    //회원정보 응답
    @Setter
    @Getter
    public static class Response {
        private Long userId;
        private String email;
        private User.Gender gender;
        private Integer age;
        private String username;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String genre;
        private String preferredOtt;
    }
}
