package com.cinemaprincess.user.mapper;

import com.cinemaprincess.review.dto.ReviewResponseDto;
import org.mapstruct.Mapper;

import com.cinemaprincess.user.dto.UserDto;
import com.cinemaprincess.user.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User postDtoToUser(UserDto.Post userPostDto);

    User patchDtoToUser(UserDto.Patch userPatchDto);

    User patchPasswordToUser(UserDto.PatchToPassword userPatchToPassword);

    default UserDto.Response userToReviewResponseDto(User user) {
        UserDto.Response.ResponseBuilder response = UserDto.Response.builder();

        response.userId(user.getUserId());
        response.email(user.getEmail());
        response.gender(user.getGender());
        response.age(user.getAge());
        response.username(user.getUsername());
        response.createdAt(user.getCreatedAt());
        response.modifiedAt(user.getModifiedAt());
        response.genre(user.getGenre());
        response.provider(user.getProvider());
        response.profileImgName(user.getProfileImgName());
        response.profileImgPath(user.getProfileImgPath());

        List<ReviewResponseDto> reviewDtos = user.getReviews().stream()
                .map(review -> {
                    ReviewResponseDto reviewDto = new ReviewResponseDto();
                    reviewDto.setReviewId(review.getReviewId());
                    reviewDto.setUserId(review.getUser().getUserId());
                    reviewDto.setMovieId(review.getMovieDetail().getMovie().getMovieId());
                    reviewDto.setContent(review.getContent());
                    reviewDto.setScore(review.getScore());
                    reviewDto.setUsername(review.getUser().getUsername());
                    reviewDto.setVotesCount(10);
                    reviewDto.setCreatedAt(String.valueOf(review.getCreatedAt()));
                    reviewDto.setModifiedAt(String.valueOf(review.getModifiedAt()));
                    return reviewDto;
                })
                .collect(Collectors.toList());
        response.reviews(reviewDtos);

        return response.build();
    }
}
