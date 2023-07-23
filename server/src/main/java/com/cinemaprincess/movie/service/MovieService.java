package com.cinemaprincess.movie.service;

import com.cinemaprincess.exception.BusinessLogicException;
import com.cinemaprincess.exception.ExceptionCode;
import com.cinemaprincess.movie.dto.MovieDto;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.entity.MovieDetailGenre;
import com.cinemaprincess.movie.mapper.MovieMapper;
import com.cinemaprincess.movie.repository.MovieDetailGenreRepository;
import com.cinemaprincess.movie.repository.MovieDetailRepository;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.cinemaprincess.movie.repository.MovieRepository;
import com.cinemaprincess.user.entity.User;
import com.cinemaprincess.user.repository.UserRepository;
import com.cinemaprincess.utils.RestTemplateConfig;
import com.cinemaprincess.watchlist.entity.WatchlistMovie;
import com.cinemaprincess.watchlist.service.WatchlistService;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final MovieDetailRepository movieDetailRepository;
    private final MovieJdbcRepository movieJdbcRepository;
    private final MovieDetailGenreRepository movieDetailGenreRepository;
    private final MovieMapper movieMapper;
    private final UserRepository userRepository;
    private final RestTemplateConfig restTemplateConfig;
    private final WatchlistService watchlistService;
    @Value("${tmdb.key}")
    String key;

    public String buildMovieUrl(String keyword, int page) {
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/movie/" + keyword)
                .queryParam("api_key", key)
                .queryParam("language", "ko")
                .queryParam("region", "kr")
                .queryParam("page", page)
                .build()
                .toUriString();
    }

    public List<Movie> findMovieListByKeyword(String keyword, int page) {
        List<Movie> movies = new ArrayList<>();
        try {
            String url = this.buildMovieUrl(keyword, page);
            ResponseEntity<String> response = restTemplateConfig.restTemplate().exchange(url, HttpMethod.GET, null, String.class);
            String responseBody = response.getBody();

            JsonParser jsonParser = new JsonParser();
            JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();
            JsonArray resultsArray = jsonObject.getAsJsonArray("results");

            for (JsonElement element : resultsArray) {
                JsonObject resultsObject = element.getAsJsonObject();
                long movieId = resultsObject.get("id").getAsLong();
                Optional<Movie> movie = movieRepository.findById(movieId);
                movie.ifPresent(movies::add);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return movies;
    }

    public List<Movie> findMonthlyMovies() {
        List<Movie> movies = new ArrayList<>();
        String year = String.format("%04d", LocalDateTime.now().getYear());
        String month = String.format("%02d", LocalDateTime.now().getMonthValue());

        List<MovieDetail> movieDetails = movieDetailRepository.findByReleaseDateMonth(year, month, PageRequest.of(0, 5));

        for (MovieDetail movieDetail : movieDetails) {
            Optional<Movie> movie = movieRepository.findById(movieDetail.getId());
            movie.ifPresent(movies::add);
        }

        return movies;
    }


    public List<MovieDto.Response> getSimilarMovies(long movieId) {
        MovieDetail movieDetail = findVerifiedMovie(movieId);

        MovieDetailGenre movieDetailGenre = movieDetailGenreRepository.findByMovieDetail(movieDetail).get(0);
        long genreId = movieDetailGenre.getGenre().getGenreId();

        List<MovieDetail> similarMovieDetails =
                movieDetailGenreRepository.findSimilarMovieDetailsWithVote(genreId, movieId, PageRequest.of(0, 10, Sort.unsorted()));

        // 유사 영화 DTO 리스트 생성
        List<MovieDto.Response> similarMovieDTOs = new ArrayList<>();
        for (MovieDetail similarMovieDetail : similarMovieDetails) {
            Movie movie = similarMovieDetail.getMovie();
            similarMovieDTOs.add(movieMapper.movieToMovieResponseDto(movie));
        }

        return similarMovieDTOs;
    }

    public MovieDetail findMovie(Long movieId) {
        return findVerifiedMovie(movieId);
    }

    private MovieDetail findVerifiedMovie(Long movieId) {
        Optional<MovieDetail> optional = movieDetailRepository.findById(movieId);

        return optional
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MOVIE_NOT_FOUND));
    }

    public boolean findWatchlistMovie(Long movieId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getAuthorities().toString().equals("[ROLE_USER]")) {
            String email = authentication.getName();
            User user = userRepository.findUserByEmail(email);
            List<WatchlistMovie> watchlistMovies = user.getWatchlist().getWatchlistMovies();
            for (WatchlistMovie watchlistMovie : watchlistMovies) {
                if (watchlistMovie.getMovie().getMovieId() == movieId) {
                    return true;
                }
            }
        }
        return false;
    }
}