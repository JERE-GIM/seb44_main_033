package com.cinemaprincess.genre.service;

import com.cinemaprincess.genre.entity.Genre;
import com.cinemaprincess.genre.entity.GenreMap;
import com.cinemaprincess.genre.repository.GenreRepository;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.repository.MovieRepository;
import com.cinemaprincess.utils.RestTemplateConfig;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
@EnableScheduling
public class GenreService {
    @Value("${tmdb.key}")
    String key;
    private final GenreRepository genreRepository;
    private final MovieRepository movieRepository;
    private final GenreMap genreMap;
    private final RestTemplateConfig restTemplateConfig;

    public String buildGenreListUrl() {
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/genre/movie/list")
                .queryParam("api_key", key)
                .queryParam("language", "ko")
                .build()
                .toUriString();
    }

    public void getGenreList() {
        try {
            String url = buildGenreListUrl();
            List<Genre> genres = parseGenreList(restTemplateConfig.restTemplate(url));

            // 장르를 캐시에 추가
            for (Genre genre : genres) {
                genreMap.addGenre(genre);
            }

            genreRepository.saveAll(genres);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Genre> parseGenreList(String responseBody) {
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();
        JsonArray genreArray = jsonObject.getAsJsonArray("genres");

        List<Genre> genres = new ArrayList<>();
        for (JsonElement element : genreArray) {
            JsonObject genreObject = element.getAsJsonObject();
            Genre genre = new Genre();
            genre.setGenreId(genreObject.get("id").getAsLong());
            genre.setGenreName(genreObject.get("name").getAsString());

            genres.add(genre);
        }

        return genres;
    }

    @Cacheable(cacheNames = "genresByYear", key = "#year")
    public Map<String, Long> getGenresByYear(int year) {
        List<Movie> movies = movieRepository.getMoviesByYear(year);
        return movies.stream()
                .flatMap(movie -> movie.getMovieDetail().getMovieDetailGenres().stream())
                .map(movieDetailGenre -> movieDetailGenre.getGenre().getGenreName())
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
    }

    /*
        매달 1일 캐시 삭제
     */
    @Scheduled(cron = "0 0 0 1 * ?")
    @CacheEvict(cacheNames = "genresByYear", allEntries = true)
    public void evictCache() {
    }
}
