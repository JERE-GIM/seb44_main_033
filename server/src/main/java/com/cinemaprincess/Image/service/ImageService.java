//package com.cinemaprincess.Image.service;
//
//import com.cinemaprincess.Image.dto.ImageUploadDto;
//import com.cinemaprincess.Image.repository.ImageRepository;
//import lombok.Getter;
//import lombok.RequiredArgsConstructor;
//import org.apache.tomcat.util.http.fileupload.impl.FileUploadIOException;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class ImageService {
//    private final ImageRepository imageRepository;
//
//    @Value("${file.path}")
//    private String uploadFolder;
//
//    public ImageResponse upload(MultipartFile image) {
//        final String extension = image.getContentType().split("/")[1];
//        final String imageName = UUID.randomUUID() + "." + extension;
//
//        try {
//            final File file = new File(uploadFolder + imageName);
//            image.transferTo(file);
//        } catch (Exception e) {
//            throw new FileIoException();
//        }
//        return new ImageResponse(imageName);
//    }
//}
