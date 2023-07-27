package com.cinemaprincess.movie.repository;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.entity.MovieDetailGenre;
import com.cinemaprincess.movie.entity.MovieDetailWatchProvider;
import com.cinemaprincess.movie.vote.MovieVote;
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
        String sql = "INSERT INTO movie (movie_id, title, poster_path) "
                + "VALUES (?, ?, ?) "
                + "ON DUPLICATE KEY UPDATE movie_id = VALUES(movie_id), "
                + "title = VALUES(title), "
                + "poster_path = VALUES(poster_path)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Movie movie = movies.get(i);
                ps.setLong(1, movie.getMovieId());
                ps.setString(2, movie.getTitle());
                ps.setString(3, movie.getPosterPath());
            }

            @Override
            public int getBatchSize() {
                return movies.size();
            }
        });
    }

    public void saveMovieDetails(List<MovieDetail> movieDetails) {
        String sql = "INSERT INTO movie_detail (movie_id, backdrop_path, overview, runtime, certification, director, actors, video_path, release_date) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) "
                + "ON DUPLICATE KEY UPDATE movie_id = VALUES(movie_id), "
                + "backdrop_path = VALUES(backdrop_path), "
                + "overview = VALUES(overview), "
                + "runtime = VALUES(runtime), "
                + "director = VALUES(director), "
                + "actors = VALUES(actors), "
                + "video_path = VALUES(video_path), "
                + "release_date = VALUES(release_date), "
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
                ps.setString(6, movieDetail.getDirector());
                ps.setString(7, movieDetail.getActors());
                ps.setString(8, movieDetail.getVideoPath());
                ps.setString(9, movieDetail.getReleaseDate());
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

    public void saveMovieDetailGenres(List<MovieDetailGenre> movieDetailGenres) {
        String sql = "INSERT INTO movie_detail_genre (movie_id, genre_id) "
                + "VALUES (?, ?) "
                + "ON DUPLICATE KEY UPDATE movie_id = VALUES(movie_id), "
                + "genre_id = VALUES(genre_id)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                MovieDetailGenre movieDetailGenre = movieDetailGenres.get(i);
                ps.setLong(1, movieDetailGenre.getMovieDetail().getId());
                ps.setLong(2, movieDetailGenre.getGenre().getGenreId());
            }

            @Override
            public int getBatchSize() {
                return movieDetailGenres.size();
            }
        });
    }

    public void saveMovieDetailWatchProviders(List<MovieDetailWatchProvider> movieDetailWatchProviders) {
        String sql = "INSERT INTO movie_detail_watch_provider (movie_id, provider_id) "
                + "VALUES (?, ?) "
                + "ON DUPLICATE KEY UPDATE movie_id = VALUES(movie_id), "
                + "provider_id = VALUES(provider_id)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                MovieDetailWatchProvider movieDetailWatchProvider = movieDetailWatchProviders.get(i);
                ps.setLong(1, movieDetailWatchProvider.getMovieDetail().getId());
                ps.setLong(2, movieDetailWatchProvider.getWatchProvider().getProviderId());
            }

            @Override
            public int getBatchSize() {
                return movieDetailWatchProviders.size();
            }
        });
    }

    public void saveMovieVote(List<MovieVote> movieVotes) {
        String sql = "INSERT INTO movie_vote (movie_id, vote_average, vote_count) "
                + "VALUES (?, ?, ?) "
                + "ON DUPLICATE KEY UPDATE movie_id = VALUES(movie_id), "
                + "vote_average = VALUES(vote_average), "
                + "vote_count = VALUES(vote_count)";

        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                MovieVote movieVote = movieVotes.get(i);
                ps.setLong(1, movieVote.getMovieDetail().getId());
                ps.setFloat(2, movieVote.getVoteAverage());
                ps.setInt(3, movieVote.getVoteCount());
            }

            @Override
            public int getBatchSize() {
                return movieVotes.size();
            }
        });
    }
}

