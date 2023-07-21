package com.cinemaprincess.movie.save;

import com.cinemaprincess.genre.Genre;
import com.cinemaprincess.genre.GenreCache;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.entity.MovieDetailCache;
import com.cinemaprincess.movie.entity.MovieDetailGenre;
import com.cinemaprincess.movie.entity.MovieDetailWatchProvider;
import com.cinemaprincess.movie.repository.MovieDetailRepository;
import com.cinemaprincess.movie.watch_provider.WatchProvider;
import com.cinemaprincess.movie.watch_provider.WatchProviderCache;
import com.cinemaprincess.utils.RestTemplateConfig;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
@Transactional
public class SaveMovieDetail {
    private final MovieDetailRepository movieDetailRepository;
    private MovieDetail movieDetail;
    private final GenreCache genreCache;
    private final WatchProviderCache watchProviderCache;
    private final MovieDetailCache movieDetailCache;
    private final RestTemplateConfig restTemplateConfig;

    @Value("${tmdb.key}")
    String key;

    public String buildMovieDetailUrl(long movieId) {
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/movie/" + movieId)
                .queryParam("api_key", key)
                .queryParam("language", "ko")
                .queryParam("append_to_response", "credits,videos,watch/providers,release_dates")
                .build()
                .toUriString();
    }

    public MovieDetail getMovieDetail(long movieId) {
        MovieDetail movieDetail = movieDetailCache.getMovieDetailById(movieId);
        if (movieDetail == null) {
            try {
                String url = buildMovieDetailUrl(movieId);
                ResponseEntity<String> response = restTemplateConfig.restTemplate().exchange(url, HttpMethod.GET, null, String.class);
                String responseBody = response.getBody();
                movieDetail = parseMovieDetail(responseBody);

                // 캐시에 저장
                movieDetailCache.addMovieDetail(movieDetail);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
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

        List<MovieDetailGenre> movieDetailGenreList = parseMovieDetailGenres(jsonObject);

        List<MovieDetailWatchProvider> movieDetailWatchProviders = parseMovieDetailWatchProviders(jsonObject);

        String releaseDate = parseReleaseDate(jsonObject);

        return MovieDetail.builder()
                .id(jsonObject.get("id").getAsLong())
                .backdropPath(backdropPath)
                .overview(overview)
                .runtime(jsonObject.get("runtime").getAsInt())
                .certification(certification)
                .actors(actors)
                .director(director)
                .videoPath(videoPath)
                .movieDetailGenres(movieDetailGenreList)
                .movieDetailWatchProviders(movieDetailWatchProviders)
                .releaseDate(releaseDate)
                .build();
    }

    private List<MovieDetailGenre> parseMovieDetailGenres(JsonObject jsonObject) {
        JsonArray genreArray = jsonObject.getAsJsonArray("genres");

        return StreamSupport.stream(genreArray.spliterator(), false)
                .map(JsonElement::getAsJsonObject)
                .map(genreObject -> {
                    long genreId = genreObject.get("id").getAsLong();
                    Genre genre = genreCache.getGenreById(genreId);
                    movieDetail = movieDetailRepository.getReferenceById(jsonObject.get("id").getAsLong());

                    MovieDetailGenre movieDetailGenre = new MovieDetailGenre();
                    movieDetailGenre.setMovieDetail(movieDetail);
                    movieDetailGenre.setGenre(genre);
                    return movieDetailGenre;
                })
                .collect(Collectors.toList());
    }

    private List<MovieDetailWatchProvider> parseMovieDetailWatchProviders(JsonObject jsonObject) {
        List<MovieDetailWatchProvider> movieDetailWatchProviders = new ArrayList<>();

        JsonObject watchProvidersObject = jsonObject.getAsJsonObject("watch/providers");
        JsonObject resultsObject = watchProvidersObject.getAsJsonObject("results");
        JsonObject koreaObject = resultsObject.getAsJsonObject("KR");
        if (koreaObject == null) {
            return movieDetailWatchProviders;
        }

        JsonArray ottArray = koreaObject.getAsJsonArray("flatrate");
        if (ottArray == null) {
            return movieDetailWatchProviders;
        }

        for (JsonElement element : ottArray) {
            JsonObject ottObject = element.getAsJsonObject();

            long providerId = ottObject.get("provider_id").getAsLong();
            WatchProvider watchProvider = watchProviderCache.getProviderById(providerId);

            if (watchProvider != null) {
                movieDetail = movieDetailRepository.getReferenceById(jsonObject.get("id").getAsLong());

                MovieDetailWatchProvider movieDetailWatchProvider = new MovieDetailWatchProvider();
                movieDetailWatchProvider.setWatchProvider(watchProvider);
                movieDetailWatchProvider.setMovieDetail(movieDetail);

                movieDetailWatchProviders.add(movieDetailWatchProvider);
            }
        }

        return movieDetailWatchProviders;
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

        Stream<JsonElement> crewStream = StreamSupport.stream(crewArray.spliterator(), false);

        Optional<String> directorOptional = crewStream
                .map(JsonElement::getAsJsonObject)
                .filter(crewObject -> crewObject.get("job").getAsString().equals("Director"))
                .map(crewObject -> crewObject.get("name").getAsString())
                .findFirst();

        return directorOptional.orElse("");
    }

    private String parseActors(JsonObject creditsObject) {
        JsonArray castArray = creditsObject.getAsJsonArray("cast");

        List<String> actors = IntStream.range(0, Math.min(castArray.size(), 3))
                .mapToObj(i -> castArray.get(i).getAsJsonObject())
                .map(castObject -> castObject.get("name").getAsString())
                .collect(Collectors.toList());

        return String.join(", ", actors);
    }

    private String parseCertification(JsonObject jsonObject) {
        JsonObject releaseDatesObject = jsonObject.getAsJsonObject("release_dates");
        JsonArray resultsArray = releaseDatesObject.getAsJsonArray("results");

        Stream<JsonElement> certificationStream = StreamSupport.stream(resultsArray.spliterator(), false);

        Optional<String> certificationOptional = certificationStream
                .map(JsonElement::getAsJsonObject)
                .filter(resultObject -> resultObject.get("iso_3166_1").getAsString().equals("KR"))
                .flatMap(resultObject -> StreamSupport.stream(resultObject.getAsJsonArray("release_dates").spliterator(), false)
                        .map(JsonElement::getAsJsonObject)
                        .map(releaseDateObject -> releaseDateObject.get("certification").getAsString())
                        .filter(certificationString -> !certificationString.isEmpty()))
                .findFirst();

        return certificationOptional.orElse("");
    }

    private String parseReleaseDate(JsonObject jsonObject) {
        String releaseDate = jsonObject.get("release_date").getAsString();

        JsonObject releaseDatesObject = jsonObject.getAsJsonObject("release_dates");
        JsonArray resultsArray = releaseDatesObject.getAsJsonArray("results");

        Stream<JsonElement> releaseDateStream = StreamSupport.stream(resultsArray.spliterator(), false);

        Optional<String> releaseDateOptional = releaseDateStream
                .map(JsonElement::getAsJsonObject)
                .filter(resultObject -> resultObject.get("iso_3166_1").getAsString().equals("KR"))
                .flatMap(resultObject -> StreamSupport.stream(resultObject.getAsJsonArray("release_dates").spliterator(), false)
                        .map(JsonElement::getAsJsonObject)
                        .filter(releaseDateObject -> releaseDateObject.get("type").getAsLong() == 3)
                        .map(releaseDateObject -> releaseDateObject.get("release_date").getAsString().substring(0, 10)))
                .findFirst();

        return releaseDateOptional.orElse(releaseDate);
    }
}