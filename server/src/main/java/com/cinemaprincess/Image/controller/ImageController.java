//package com.cinemaprincess.Image.controller;
//
//import com.cinemaprincess.Image.dto.ImageUploadDto;
//import com.cinemaprincess.Image.service.ImageService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.validation.Valid;
//import javax.validation.constraints.Positive;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/users/mypage/edit")
//public class ImageController {
//    private final ImageService imageService;
//
//    @PostMapping("/{user-id}/upload")
//    public ResponseEntity<ImageReponse> imageUpload(@RequestPart MultipartFile image) {
//        ImageResponse imageResponse = imageService.upload(image);
//
//        return ResponseEntity.ok(imageResponse);
//    }
//
//}
