package com.cinemaprincess.review.repository;

import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.review.entity.Review;
import com.cinemaprincess.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findById(Long id);
    Optional<Review> findByUserAndMovieDetail(User user, MovieDetail movieDetail);

//    @Query(value = "SELECT m.releaseDate as releaseDate, m.title AS title, m.posterPath as posterPath, COUNT(r.reviewId) AS reviewCount " +
//                    "FROM Review r JOIN r.movie m " +
//                    "WHERE DATE(r.createdAt) = DATE(:today) " +
//                    "GROUP BY m.movieId " +
//                    "ORDER BY reviewCount DESC")
//    List<TopReviewedMoviesResponse> findReviewsByDay(@Param("today") LocalDateTime today);
//
//    @Query(value = "SELECT m.releaseDate as releaseDate, m.title AS title, m.posterPath as posterPath, COUNT(r.reviewId) AS reviewCount " +
//            "FROM Review r JOIN r.movie m " +
//            "WHERE DATE(r.createdAt) >= DATE(:weekAgo) " +
//            "GROUP BY m.movieId " +
//            "ORDER BY reviewCount DESC")
//    List<TopReviewedMoviesResponse> findReviewsByWeek(@Param("weekAgo") LocalDateTime weekAgo);
//
//    @Query(value = "SELECT m.releaseDate as releaseDate, m.title AS title, m.posterPath as posterPath, COUNT(r.reviewId) AS reviewCount " +
//            "FROM Review r JOIN r.movie m " +
//            "WHERE DATE(r.createdAt) >= DATE(:monthAgo) " +
//            "GROUP BY m.movieId " +
//            "ORDER BY reviewCount DESC")
//    List<TopReviewedMoviesResponse> findReviewsByMonth(@Param("monthAgo") LocalDateTime monthAgo);
/*
*/
    List<Review> findByMovieDetail_Id(long movieId);
    Page<Review> findByMovieDetail_Id(long movieId, Pageable pageable);
    Page<Review> findByUserUserId(long userId, Pageable pageable);
    List<Review> findByMovieDetail_IdIn(List<Long> movieDetailIds);
}
