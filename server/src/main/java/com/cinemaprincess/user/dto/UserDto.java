package com.cinemaprincess.user.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import com.cinemaprincess.response.PageInfo;
import com.cinemaprincess.review.dto.ReviewResponseDto;
import com.cinemaprincess.user.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

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

//        @NotNull(message = "성별을 선택해 주세요.")
        private User.Gender gender;

//        @NotNull(message = "연령대를 선택해 주세요.")
        private Integer age;

        @NotBlank(message = "닉네임을 작성해 주세요.") // unique 옵션 프론트와 상의
        private String username;

        private List<Long> genre;
    }

    //회원정보 수정
    @Setter
    @Getter
    public static class Patch {
        private Long userId;

        private Integer age;

        private String username;

        private List<Long> genre;
    }

    // password 수정
    @Setter
    @Getter
    public static class PatchToPassword {
        private Long userId;

        @NotBlank
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$",
                message = "password 길이는 최소 8자 이상 최대 20자 이하, 숫자 1자 이상, 대소문자 구분없이 영문자 1자 이상, 특수문자 1자 이상 입력해 주세요.")
        private String password;

        @NotBlank
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,20}$",
                message = "password 길이는 최소 8자 이상 최대 20자 이하, 숫자 1자 이상, 대소문자 구분없이 영문자 1자 이상, 특수문자 1자 이상 입력해 주세요.")
        private String newPassword;
    }


    //회원정보 응답
    @Setter
    @Getter
    @Builder
    public static class Response {
        private Long userId;
        private String email;
        private User.Gender gender;
        private Integer age;
        private String username;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private List<Long> genre;
        private String provider;
        private String profileImgName;
        private String profileImgPath;
    }

    @Getter
    public static class UserMultiResponseDto<T> {
        private T data;
        private List<ReviewResponseDto> reviews;
        private PageInfo pageInfo;

        public UserMultiResponseDto(T data, List<ReviewResponseDto> reviews, Page page) {
            this.data = data;
            this.reviews = reviews;
            this.pageInfo = new PageInfo(page.getNumber() + 1,
                    page.getSize(), page.getTotalElements(), page.getTotalPages());
        }
    }
}
