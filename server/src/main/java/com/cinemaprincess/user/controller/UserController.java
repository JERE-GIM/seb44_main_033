package com.cinemaprincess.user.controller;

import java.io.IOException;
import java.net.URI;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import com.cinemaprincess.exception.BusinessLogicException;
import com.cinemaprincess.exception.ExceptionCode;
import com.cinemaprincess.genre.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity getUser(@PathVariable("user-id") @Positive Long userId) {
        User user = userService.findUser(userId);

        return new ResponseEntity<>(userMapper.userToResponse(user), HttpStatus.OK);
    }

    // 회원 탈퇴
    @DeleteMapping("/users/mypage/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") @Positive Long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 프로필 사진 업로드
    @PostMapping("/users/mypage/edit/{user-id}/upload")
    public ResponseEntity profileImgUpload(@PathVariable("user-id") @Positive Long userId,
                                           @RequestPart(value="imgFile", required=false) MultipartFile imgFile) throws IOException {
        User user = userService.findUser(userId);
        userService.imgFileUpload(user, imgFile);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("users/mypage/edit/{user-id}/upload")
    public ResponseEntity getProfileImg(@PathVariable("user-id") @Positive Long userId) throws IOException {
        User user = userService.findUser(userId);
        byte[] imageByteArray = userService.getImgFile(user);

        return new ResponseEntity<>(imageByteArray, HttpStatus.OK);
    }
}
