package com.cinemaprincess.movie.save;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.entity.MovieDetailGenre;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.cinemaprincess.movie.repository.MovieRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
@Transactional
public class SaveMovieDetail {
    String key = "8799558ac2f2609cd5ff89aa63a87f10";
    private final MovieRepository movieRepository;
    private final MovieJdbcRepository movieJdbcRepository;
    private MovieDetail movieDetail;
    private final Map<Long, MovieDetail> movieDetailCache = new ConcurrentHashMap<>();

    RestTemplate restTemplate = new RestTemplate();

    public String buildMovieDetailUrl(long movieId, String language) {
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/movie/" + movieId)
                .queryParam("api_key", key)
                .queryParam("language", language)
                .queryParam("append_to_response", "credits,videos,watch/providers,release_dates")
                .build()
                .toUriString();
    }

    public MovieDetail getMovieDetail(long movieId) {
        // 캐시에서 영화 상세 정보 조회
        MovieDetail cachedMovieDetail = movieDetailCache.get(movieId);
        if (cachedMovieDetail != null) {
            return cachedMovieDetail;
        }

        try {
            String url = buildMovieDetailUrl(movieId, "ko");
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
            String responseBody = response.getBody();
            movieDetail = parseMovieDetail(responseBody);

            if (movieDetail != null && movieDetail.getOverview().isEmpty()) { // 한글 개요가 없을때 영어 개요 가져오기
                url = buildMovieDetailUrl(movieId, "en");
                response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
                responseBody = response.getBody();
                String overview = parseOverview(responseBody);
                movieDetail.setOverview(overview);
            }

            // 영화 상세 정보 캐시에 저장
            movieDetailCache.put(movieId, movieDetail);
        } catch (Exception e) {
            e.printStackTrace();
        }
        movieJdbcRepository.saveMovieDetail(movieDetail);
        return movieDetail;
    }

    private MovieDetail parseMovieDetail(String responseBody) {
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();

        String overview = parseOverview(responseBody);

        String certification = parseCertification(jsonObject);

        String backdropPath = parseBackdropPath(jsonObject);

        JsonObject creditsObject = jsonObject.getAsJsonObject("credits");
        String actors = parseActors(creditsObject);

        String director = parseDirector(creditsObject);

        String videoPath = parseVideoPath(jsonObject);

        JsonArray genreArray = jsonObject.getAsJsonArray("genres");

        for (JsonElement element : genreArray) {
            JsonObject genreObject = element.getAsJsonObject();
            genreObject.get("id").getAsLong();
        }

        Movie movie = movieRepository.findById(jsonObject.get("id").getAsLong()).get();

        return MovieDetail.builder()
                .id(movie.getMovieId())
                .movie(movie)
                .backdropPath(backdropPath)
                .overview(overview)
                .runtime(jsonObject.get("runtime").getAsInt())
                .certification(certification)
                .actors(actors)
                .director(director)
                .videoPath(videoPath)
                .build();
    }

    private String parseOverview(String responseBody) {
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();
        String overview = "";
        if (!jsonObject.get("overview").isJsonNull()) {
            overview = jsonObject.get("overview").getAsString();
        }
        return overview;
    }

    private String parseBackdropPath(JsonObject jsonObject) {
        String backdropPath = "";
        if (!jsonObject.get("backdrop_path").isJsonNull()) {
            backdropPath = jsonObject.get("backdrop_path").getAsString();
        }
        return backdropPath;
    }

    private String parseVideoPath(JsonObject jsonObject) {
        JsonObject videosObject = jsonObject.getAsJsonObject("videos");
        JsonArray videoArray = videosObject.getAsJsonArray("results");

        String videoPath = "";
        if (videoArray.size() != 0) {
            JsonObject videoObject = videoArray.get(0).getAsJsonObject();
            videoPath = "https://www.youtube.com/embed/" + videoObject.get("key").getAsString();
        }
        return videoPath;
    }

    private String parseDirector(JsonObject creditsObject) {
        JsonArray crewArray = creditsObject.getAsJsonArray("crew");
        String director = "";
        if (crewArray.size() != 0) {
            for (JsonElement element : crewArray) {
                JsonObject crewObject = element.getAsJsonObject();
                if (crewObject.get("job").getAsString().equals("Director") && !crewObject.get("name").isJsonNull()) {
                    director = crewObject.get("name").getAsString();
                }
            }
        }
        return director;
    }

    private String parseActors(JsonObject creditsObject) {
        JsonArray castArray = creditsObject.getAsJsonArray("cast");

        String actors = "";
        if (castArray.size() != 0) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 3; i++) {
                JsonObject castObject = castArray.get(i).getAsJsonObject();
                if (!castObject.get("name").isJsonNull()) {
                    sb.append(castObject.get("name").getAsString()).append(", ");
                }
            }
            actors = sb.substring(0, sb.length() - 2);
        }
        return actors;
    }

    private String parseCertification(JsonObject jsonObject) {
        // "release_dates" 배열 가져오기
        JsonObject releaseDatesObject = jsonObject.getAsJsonObject("release_dates");
        JsonArray resultsArray = releaseDatesObject.getAsJsonArray("results");

        String certification = "";

        outer:
        for (JsonElement element : resultsArray) {
            JsonObject resultObject = element.getAsJsonObject();

            // "iso_3166_1" 값이 "KR"인 경우
            if (resultObject.get("iso_3166_1").getAsString().equals("KR")) {
                JsonArray releaseDates = resultObject.getAsJsonArray("release_dates");

                for (JsonElement releaseDate : releaseDates) {
                    JsonObject releaseDateObject = releaseDate.getAsJsonObject();
                    if (!releaseDateObject.get("certification").getAsString().isEmpty()) {
                        certification = releaseDateObject.get("certification").getAsString();
                        break outer;
                    }
                }
            }
        }
        return certification;
    }
}


