package com.cinemaprincess.user.controller;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import com.cinemaprincess.review.dto.ReviewResponseDto;
import com.cinemaprincess.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import com.cinemaprincess.user.dto.UserDto;
import com.cinemaprincess.user.entity.User;
import com.cinemaprincess.user.mapper.UserMapper;
import com.cinemaprincess.user.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@Validated
@RequestMapping("/")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final ReviewService reviewService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post postDto) {
        User user = userMapper.postDtoToUser(postDto);
        User createUser = userService.createUser(user);

        URI location = UriComponentsBuilder
                .newInstance()
                .path("/")
                .buildAndExpand(createUser.getUserId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    // 회원정보 수정
    @PatchMapping("/users/mypage/edit/{user-id}")
    public ResponseEntity patchUser(@PathVariable("user-id") @Positive Long userId,
                                    @Valid @RequestBody UserDto.Patch patchDto) {
        User user = userMapper.patchDtoToUser(patchDto);
        user.setUserId(userId);

        userService.updateUser(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // password 수정
    @PatchMapping("/users/mypage/edit/pw/{user-id}")
    public ResponseEntity patchPasswordToUser(@PathVariable("user-id") @Positive Long userId,
                                              @Valid @RequestBody UserDto.PatchToPassword patchToPasswordDto) {
        User user = userMapper.patchPasswordToUser(patchToPasswordDto);
        user.setUserId(userId);
        String newPassword = patchToPasswordDto.getNewPassword();

        userService.updatePasswordToUser(user, newPassword);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 회원 조회
    @GetMapping("/users/mypage/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") @Positive Long userId,
                                  @RequestParam(value = "page", defaultValue = "1") int page) {
        User user = userService.findUser(userId);
        Page<ReviewResponseDto> reviewPage = reviewService.findReviewsByUserId(userId, page - 1);
        List<ReviewResponseDto> reviews = reviewPage.getContent();

        UserDto.Response response = userMapper.userToResponseDto(user);

        return new ResponseEntity<>(new UserDto.UserMultiResponseDto<>(response, reviews, reviewPage), HttpStatus.OK);

    }

    // 회원 탈퇴
    @DeleteMapping("/users/mypage/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") @Positive Long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 프로필 사진 업로드
    @PostMapping("/users/mypage/edit/{user-id}/upload")
    public ResponseEntity uploadProfileImg(@PathVariable("user-id") @Positive Long userId,
                                           @RequestPart(value="imgFile", required=false) MultipartFile imgFile) throws IOException {
        User user = userService.findUser(userId);
        userService.uploadImgFile(user, imgFile);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("users/mypage/edit/{user-id}/upload")
    public ResponseEntity<byte[]> getProfileImg(@PathVariable("user-id") @Positive Long userId) throws IOException {
        User user = userService.findUser(userId);
        byte[] imageBytes = userService.getImgFile(user);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        headers.setContentType(MediaType.IMAGE_PNG);

        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }
}
