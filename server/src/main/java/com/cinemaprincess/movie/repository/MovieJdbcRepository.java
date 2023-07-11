package com.cinemaprincess.movie.repository;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MovieJdbcRepository {
    private final JdbcTemplate jdbcTemplate;

    public void saveMovies(List<Movie> movies) {
        String sql = "INSERT INTO movie (vote_average, poster_path, release_date, title, movie_id) "
                + "VALUES (?, ?, ?, ?, ?) "
                + "ON DUPLICATE KEY UPDATE vote_average = VALUES(vote_average), "
                + "poster_path = VALUES(poster_path), "
                + "release_date = VALUES(release_date), "
                + "title = VALUES(title), "
                + "movie_id = VALUES(movie_id)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Movie movie = movies.get(i);
                ps.setString(2, movie.getPosterPath());
                ps.setString(3, movie.getReleaseDate());
                ps.setString(4, movie.getTitle());
                ps.setFloat(1, movie.getVoteAverage());
                ps.setLong(5, movie.getMovieId());
            }

            @Override
            public int getBatchSize() {
                return movies.size();
            }
        });
    }

    public void saveMovieDetails(List<MovieDetail> movieDetails) {
        String sql = "INSERT INTO movie_detail (movie_id, backdrop_path, overview, runtime, certification) "
                + "VALUES (?, ?, ?, ?, ?) "
                + "ON DUPLICATE KEY UPDATE movie_id = VALUES(movie_id), "
                + "backdrop_path = VALUES(backdrop_path), "
                + "overview = VALUES(overview), "
                + "runtime = VALUES(runtime), "
                + "certification = VALUES(certification)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                MovieDetail movieDetail = movieDetails.get(i);
                ps.setLong(1, movieDetail.getMovie().getMovieId());
                ps.setString(2, movieDetail.getBackdropPath());
                ps.setString(3, movieDetail.getOverview());
                ps.setInt(4, movieDetail.getRuntime());
                ps.setString(5, movieDetail.getCertification());
            }

            @Override
            public int getBatchSize() {
                return movieDetails.size();
            }
        });
    }

    public void saveMovieDetail(MovieDetail movieDetail) {
        String sql = "INSERT INTO movie_detail (movie_id, backdrop_path, overview, runtime, certification, director, actors, video_path) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?, ?) "
                + "ON DUPLICATE KEY UPDATE movie_id = VALUES(movie_id), "
                + "backdrop_path = VALUES(backdrop_path), "
                + "overview = VALUES(overview), "
                + "runtime = VALUES(runtime), "
                + "director = VALUES(director), "
                + "actors = VALUES(actors), "
                + "video_path = VALUES(video_path), "
                + "certification = VALUES(certification)";

        Object[] args = {
                movieDetail.getMovie().getMovieId(),
                movieDetail.getBackdropPath(),
                movieDetail.getOverview(),
                movieDetail.getRuntime(),
                movieDetail.getCertification(),
                movieDetail.getDirector(),
                movieDetail.getActors(),
                movieDetail.getVideoPath()
        };

        jdbcTemplate.update(sql, args);
    }
}
