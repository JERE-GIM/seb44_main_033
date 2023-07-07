package com.cinemaprincess.review.mapper;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.review.dto.ReviewPatchDto;
import com.cinemaprincess.review.dto.ReviewPostDto;
import com.cinemaprincess.review.dto.ReviewResponseDto;
import com.cinemaprincess.review.entity.Review;
import com.cinemaprincess.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
//    Review reviewPostDtoToReview(ReviewPostDto reviewPostDto);
    Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto);
    ReviewResponseDto reviewToReviewResponseDto(Review review);
    List<ReviewResponseDto> reviewsToReviewResponseDtos(List<Review> reviews);

        default Review reviewPostDtoToReview(ReviewPostDto reviewPostDto){
        Review review = new Review();
        Movie movie = new Movie();
        movie.setId(Long.parseLong(reviewPostDto.getId()));
        review.setContent(reviewPostDto.getContent());
        review.setScore(reviewPostDto.getScore());
        review.setMovie(movie);
        return review;
    }

//        default ReviewResponseDto reviewToReviewResponseDto(Review review){
//        ReviewResponseDto responseDto = new ReviewResponseDto();
//        responseDto.setReviewId(review.getReviewId());
//        responseDto.setUserId(review.getUserId());
//        responseDto.setId(review.getId());
//        responseDto.setScore(review.getScore());
//        responseDto.setContent(review.getContent());
//        responseDto.setCreatedAt(String.valueOf(review.getCreatedAt()));
//        responseDto.setModifiedAt(String.valueOf(review.getModifiedAt()));
//        return responseDto;
//    }
}
