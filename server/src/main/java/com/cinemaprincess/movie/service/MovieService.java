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
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final MovieDetailRepository movieDetailRepository;
    private final MovieJdbcRepository movieJdbcRepository;
    private final MovieDetailGenreRepository movieDetailGenreRepository;
    private final MovieMapper movieMapper;
    RestTemplate restTemplate = new RestTemplate();

    public String buildMovieUrl(String keyword) {
        String key = "8799558ac2f2609cd5ff89aa63a87f10";
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/movie/" + keyword)
                .queryParam("api_key", key)
                .queryParam("language", "ko")
                .queryParam("region", "kr")
                .build()
                .toUriString();
    }

    public Page<Movie> findMovieListByKeyword(int page, int size, String keyword) {
        List<Movie> movies = new ArrayList<>();
        Pageable pageable = PageRequest.of(page, size);

    public List<Movie> findMovieListByKeyword(String keyword) {
        List<Movie> movies = new ArrayList<>();
        try {
            String url = buildMovieUrl(keyword);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
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
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), movies.size());
        return new PageImpl<>(movies.subList(start,end), pageable, movies.size());
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

        List<MovieDetail> similarMovieDetails = movieDetailGenreRepository.findSimilarMovieDetailsWithVote(genreId, movieId, Pageable.ofSize(10));

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
}
