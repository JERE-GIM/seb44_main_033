package com.cinemaprincess.review.service;

import com.cinemaprincess.exception.BusinessLogicException;
import com.cinemaprincess.exception.ExceptionCode;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.repository.MovieDetailRepository;
import com.cinemaprincess.movie.service.MovieService;
import com.cinemaprincess.movie.vote.MovieVote;
import com.cinemaprincess.movie.vote.MovieVoteRepository;
import com.cinemaprincess.review.dto.ReviewPatchDto;
import com.cinemaprincess.review.dto.ReviewPostDto;
import com.cinemaprincess.review.dto.ReviewResponseDto;
import com.cinemaprincess.review.dto.ReviewVoteDto;
import com.cinemaprincess.review.entity.Review;
import com.cinemaprincess.review.entity.ReviewVote;
import com.cinemaprincess.review.mapper.ReviewMapper;
import com.cinemaprincess.review.projection.TopReviewedMoviesResponse;
import com.cinemaprincess.review.repository.ReviewRepository;
import com.cinemaprincess.review.repository.ReviewVoteRepository;
import com.cinemaprincess.user.entity.User;
import com.cinemaprincess.user.repository.UserRepository;
import com.cinemaprincess.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper mapper;
    private final UserRepository userRepository;
    private final ReviewVoteRepository reviewVoteRepository;
    private final MovieDetailRepository movieDetailRepository;
    private final UserService userService;
    private final MovieService movieService;
    private final MovieVoteRepository movieVoteRepository;

    public ReviewResponseDto createReview(ReviewPostDto reviewPostDto) {
        long movieId = reviewPostDto.getMovieId();
        long userId = reviewPostDto.getUserId();

        if (hasDuplicateReview(movieId, userId)) {
            throw new BusinessLogicException(ExceptionCode.DUPLICATE_REVIEW);
        }
        Review review = mapper.reviewPostDtoToReview(reviewPostDto);
        User user = userService.findUser(reviewPostDto.getUserId());
        review.setUser(user);
        MovieDetail movieDetail = movieService.findMovie(reviewPostDto.getMovieId());
        review.setMovieDetail(movieDetail);

        updateMovieVote(movieDetail, 0, review.getScore(), 1);

        Review savedReview = this.reviewRepository.save(review);
        return mapper.reviewToReviewResponseDto(savedReview);
    }

    public ReviewResponseDto updateReview(Long reviewId, ReviewPatchDto reviewPatchDto) {
        reviewPatchDto.setReviewId(reviewId);
        Review review = mapper.reviewPatchDtoToReview(reviewPatchDto);
        Review findReview = findVerifiedReview(review.getReviewId());

        Optional.ofNullable(review.getScore())
                .ifPresent(score -> {
                    int oldScore = findReview.getScore();
                    findReview.setScore(score);
                    updateMovieVote(findReview.getMovieDetail(), oldScore, score, 0);
                });
        Optional.ofNullable(review.getContent())
                .ifPresent(findReview::setContent);
        findReview.setModifiedAt(LocalDateTime.now());

        Review updatedReview = reviewRepository.save(findReview);
        return mapper.reviewToReviewResponseDto(updatedReview);
    }

    public Review findReview(long reviewId) {
        return findVerifiedReview(reviewId);
    }

    public Page<Review> findReviews(int page, int size) {
        return reviewRepository.findAll(PageRequest.of(page, size,
                Sort.by("reviewId").descending()));
    }

    private Review findVerifiedReview(long reviewId) {
        Optional<Review> optionalReview =
                reviewRepository.findById(reviewId);
        return optionalReview.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

    public User findVerifiedUser(long userId) {
        Optional<User> optionalUser =
                userRepository.findById(userId);
        return optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

    }

    public void deleteReview(long reviewId) {
        Review review = findVerifiedReview(reviewId);

        updateMovieVote(review.getMovieDetail(), review.getScore(), 0, -1);

        reviewRepository.delete(review);
    }

    public Page<ReviewResponseDto> findReviewsByMovieId(long movieId, int page) {
        Page<Review> reviewPage = reviewRepository.findByMovieDetail_Id(movieId, PageRequest.of(page, 40));
        List<ReviewResponseDto> reviewDtos = mapper.reviewsToReviewResponseDtos(reviewPage.getContent());

        return new PageImpl<>(reviewDtos, reviewPage.getPageable(), reviewPage.getTotalElements());
    }
    public Review findReviewByUserAndMovieDetail(long userId, long movieId){
        User user = userRepository.findById(userId).orElse(null);
        MovieDetail movieDetail = movieDetailRepository.findById(movieId).orElse(null);

        Optional<Review> optionalReview = reviewRepository.findByUserAndMovieDetail(user, movieDetail);
        return optionalReview.orElse(null);
    }

    public Page<ReviewResponseDto> findReviewsByUserId(long userId, int page) {
        Page<Review> reviewPage = reviewRepository.findByUserUserId(userId, PageRequest.of(page, 40));
        List<ReviewResponseDto> reviewDtos = mapper.reviewsToReviewResponseDtos(reviewPage.getContent());

        return new PageImpl<>(reviewDtos, reviewPage.getPageable(), reviewPage.getTotalElements());
    }

    public void updateMovieVote(MovieDetail movieDetail, int oldScore, int newScore, int voteChange) {
        MovieVote movieVote = movieVoteRepository.findById(movieDetail.getId()).get();
        float voteAverage = movieVote.getVoteAverage();
        int voteCount = movieVote.getVoteCount();
        float newVoteAverage = Math.round(((voteAverage * voteCount - oldScore + newScore) / (voteCount + voteChange)) * 10.0f) / 10.0f;

        movieVote.setVoteAverage(newVoteAverage);
        movieVote.setVoteCount(voteCount + voteChange);
        movieVoteRepository.save(movieVote);
    }

    public List<TopReviewedMoviesResponse> getMoviesWithReviewsByPeriod(String period) {
        /*
            TODO: n+1 리팩터링 필요, reviewRepo 쿼리문 수 줄이기, 영화의 목록 결과가 n개 이하의 경우 고려
         */
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime weekAgo = today.minusWeeks(1);
        LocalDateTime monthAgo = today.minusMonths(1);
        List<TopReviewedMoviesResponse> foundMovies = new ArrayList<>();
        switch (period) {
            case "day":
                foundMovies = reviewRepository.findReviewsByDay(today);
                break;
            case "week":
                foundMovies = reviewRepository.findReviewsByWeek(weekAgo);
                break;
            case "month":
                foundMovies = reviewRepository.findReviewsByMonth(monthAgo);
                break;
            default:
                //에러코드
                break;
        }
        return foundMovies;
    }

    public ReviewVoteDto votesCount(long reviewId, long userId) {
        Review findReview = findVerifiedReview(reviewId);
        User findUser = findVerifiedUser(userId);
        Optional<ReviewVote> optionalReviewVote = reviewVoteRepository.findByReviewAndUser(findReview, findUser);

        if (optionalReviewVote.isPresent()) {
            // 좋아요를 취소할 때는 해당 ReviewVote 엔티티를 삭제
            reviewVoteRepository.delete(optionalReviewVote.get());
            findReview.updateVoteCount(false);
        } else {
            // 좋아요를 누를 때는 새로운 ReviewVote 엔티티 생성
            ReviewVote reviewVote = ReviewVote.builder().review(findReview).user(findUser).build();
            findReview.updateVoteCount(true);
            reviewVoteRepository.save(reviewVote);
        }

        Review updatedReview = reviewRepository.save(findReview);
        ReviewVoteDto reviewVoteDto = new ReviewVoteDto();
        reviewVoteDto.setReviewVoteStatus(!optionalReviewVote.isPresent());
        reviewVoteDto.setTotalVoteCount(updatedReview.getVotesCount());

        return reviewVoteDto;
    }

    private boolean hasDuplicateReview(long movieId, long userId) {
        User user = userService.findUser(userId);
        MovieDetail movieDetail = movieService.findMovie(movieId);

        Optional<Review> existingReview = reviewRepository.findByUserAndMovieDetail(user, movieDetail);
        return existingReview.isPresent();
    }

    public boolean checkReviewLikeStatus(long reviewId, long userId) {
        // 리뷰와 유저를 데이터베이스에서 조회
        Review findReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        User findUser = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        // 리뷰와 유저를 기반으로 ReviewVote 정보를 데이터베이스에서 조회
        Optional<ReviewVote> optionalReviewVote = reviewVoteRepository.findByReviewAndUser(findReview, findUser);

        // ReviewVote 정보가 존재하면 해당 유저가 좋아요를 눌렀으므로 true를 반환, 없으면 false를 반환
        return optionalReviewVote.isPresent();
    }

}