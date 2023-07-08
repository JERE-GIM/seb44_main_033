package com.cinemaprincess.movie.repository;

import com.cinemaprincess.movie.entity.Movie;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MovieJdbcRepository {
    private final JdbcTemplate jdbcTemplate;

    public void saveMovies(List<Movie> movies) {
        String sql = "INSERT INTO movie (original_title, poster_path, release_date, title, movie_id) "
                + "VALUES (?, ?, ?, ?, ?) "
                + "ON DUPLICATE KEY UPDATE original_title = VALUES(original_title), "
                + "poster_path = VALUES(poster_path), "
                + "release_date = VALUES(release_date), "
                + "title = VALUES(title), "
                + "movie_id = VALUES(movie_id)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Movie movie = movies.get(i);
                ps.setString(1, movie.getOriginalTitle());
                ps.setString(2, movie.getPosterPath());
                ps.setString(3, movie.getReleaseDate());
                ps.setString(4, movie.getTitle());
                ps.setLong(5, movie.getMovieId());
            }

            @Override
            public int getBatchSize() {
                return movies.size();
            }
        });
    }
}
