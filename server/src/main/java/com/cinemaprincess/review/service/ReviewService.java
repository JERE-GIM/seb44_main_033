package com.cinemaprincess.review.service;

import com.cinemaprincess.exception.BusinessLogicException;
import com.cinemaprincess.exception.ExceptionCode;
import com.cinemaprincess.review.dto.ReviewPatchDto;
import com.cinemaprincess.review.dto.ReviewPostDto;
import com.cinemaprincess.review.dto.ReviewResponseDto;
import com.cinemaprincess.review.entity.Review;
import com.cinemaprincess.review.mapper.ReviewMapper;
import com.cinemaprincess.review.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper mapper;

    public ReviewResponseDto createReview(ReviewPostDto reviewPostDto){
        Review review = mapper.reviewPostDtoToReview(reviewPostDto);

        Review savedReview = (Review) this.reviewRepository.save(review);
        return mapper.reviewToReviewResponseDto(savedReview);
    }

    public ReviewResponseDto updateReview(Long reviewId, ReviewPatchDto reviewPatchDto){
        reviewPatchDto.setReviewId(reviewId);
        Review review = mapper.reviewPatchDtoToReview(reviewPatchDto);
        Review findReview = findVerifiedReview(review.getReviewId());

        Optional.ofNullable(review.getScore())
                .ifPresent(findReview::setScore);
        Optional.ofNullable(review.getContent())
                .ifPresent(findReview::setContent);
        findReview.setModifiedAt(LocalDateTime.now());

        Review updatedReview = (Review) reviewRepository.save(findReview);
        return mapper.reviewToReviewResponseDto(updatedReview);
    }

    public Review findReview(long reviewId) {
        return findVerifiedReview(reviewId);
    }

    public Page<Review> findReviews(int page, int size){
        return reviewRepository.findAll(PageRequest.of(page, size,
                Sort.by("reviewId").descending()));
    }

    private Review findVerifiedReview(long reviewId) {
        Optional<Review> optionalReview =
                reviewRepository.findById(reviewId);
        Review findReview =
                optionalReview.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        return findReview;
    }

    public void deleteReview(long reviewId){
        Review review = findVerifiedReview(reviewId);
        reviewRepository.delete(review);
    }
}
