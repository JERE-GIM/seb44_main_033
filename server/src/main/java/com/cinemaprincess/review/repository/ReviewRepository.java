package com.cinemaprincess.review.repository;

import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.review.entity.Review;
import com.cinemaprincess.review.projection.TopReviewedMoviesResponse;
import com.cinemaprincess.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findById(Long id);
    Optional<Review> findByUserAndMovieDetail(User user, MovieDetail movieDetail);

    @Query(value = "SELECT m.movie.title AS title, m.releaseDate as releaseDate, m.movie.posterPath as posterPath, m.overview AS overview, COUNT(r.reviewId) AS reviewCount " +
                    "FROM Review r JOIN r.movieDetail m " +
                    "WHERE DATE(r.createdAt) = DATE(:today) " +
                    "GROUP BY m.id " +
                    "ORDER BY reviewCount DESC")
    List<TopReviewedMoviesResponse> findReviewsByDay(@Param("today") LocalDateTime today);

    @Query(value = "SELECT m.movie.title AS title, m.releaseDate as releaseDate, m.movie.posterPath as posterPath, m.overview AS overview, COUNT(r.reviewId) AS reviewCount " +
            "FROM Review r JOIN r.movieDetail m " +
            "WHERE DATE(r.createdAt) >= DATE(:weekAgo) " +
            "GROUP BY m.id " +
            "ORDER BY reviewCount DESC")
    List<TopReviewedMoviesResponse> findReviewsByWeek(@Param("weekAgo") LocalDateTime weekAgo);

    @Query(value = "SELECT m.movie.title AS title, m.releaseDate as releaseDate, m.movie.posterPath as posterPath, m.overview AS overview, COUNT(r.reviewId) AS reviewCount " +
            "FROM Review r JOIN r.movieDetail m " +
            "WHERE DATE(r.createdAt) >= DATE(:monthAgo) " +
            "GROUP BY m.id " +
            "ORDER BY reviewCount DESC")
    List<TopReviewedMoviesResponse> findReviewsByMonth(@Param("monthAgo") LocalDateTime monthAgo);
/*
*/
    List<Review> findByMovieDetail_Id(long movieId);
    Page<Review> findByMovieDetail_Id(long movieId, Pageable pageable);
    List<Review> findByMovieDetail_IdIn(List<Long> movieDetailIds);
}
