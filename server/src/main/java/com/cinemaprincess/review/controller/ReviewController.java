package com.cinemaprincess.review.controller;

import com.cinemaprincess.response.MultiResponseDto;
import com.cinemaprincess.review.dto.ReviewPatchDto;
import com.cinemaprincess.review.dto.ReviewPostDto;
import com.cinemaprincess.review.dto.ReviewResponseDto;
import com.cinemaprincess.review.dto.ReviewVoteDto;
import com.cinemaprincess.review.entity.Review;
import com.cinemaprincess.review.mapper.ReviewMapper;
import com.cinemaprincess.review.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/reviews")
@Validated
@AllArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewMapper mapper;

    @PostMapping
    public ResponseEntity postReview(@Valid @RequestBody ReviewPostDto reviewPostDto){
        ReviewResponseDto reviewResponseDto = reviewService.createReview(reviewPostDto);

        return new ResponseEntity<>(reviewResponseDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{review-id}")
    public ResponseEntity patchReview(@PathVariable("review-id") @Positive long reviewId,
                                        @Valid @RequestBody ReviewPatchDto reviewPatchDto) {

        ReviewResponseDto reviewResponseDto = reviewService.updateReview(reviewId,reviewPatchDto);

        return new ResponseEntity<>(reviewResponseDto,HttpStatus.OK);

    }

    @GetMapping("/{review-id}")
    public ResponseEntity getReview(@PathVariable("review-id") long reviewId){
        Review review = reviewService.findReview(reviewId);

        return new ResponseEntity<>(mapper.reviewToReviewResponseDto(review),HttpStatus.OK);
    }
    @GetMapping("/{movie-id}/{user-id}")
    public ResponseEntity getReviewByUserMovie(@PathVariable("movie-id") long movieId,
                                               @PathVariable("user-id") long userId){
        Review review = reviewService.findReviewByUserAndMovieDetail(userId,movieId);

        return new ResponseEntity<>(mapper.reviewToReviewResponseDto(review),HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getReviews(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size){
        Page<Review> reviewPage = reviewService.findReviews(page-1, size);
        List<Review> reviews = reviewPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.reviewsToReviewResponseDtos(reviews),
                        reviewPage),HttpStatus.OK);

    }

    @DeleteMapping("/{review-id}")
    public ResponseEntity deleteReview(@PathVariable("review-id") long reviewId){
        reviewService.deleteReview(reviewId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/votes/{review-id}/{user-id}")
    public ResponseEntity votesCount(@PathVariable("review-id") long reviewId,
                                       @PathVariable("user-id") long userId){
        ReviewVoteDto reviewVoteDto = reviewService.votesCount(reviewId, userId);
        return new ResponseEntity<>(reviewVoteDto,HttpStatus.OK);
    }
}

