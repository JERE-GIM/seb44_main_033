package com.cinemaprincess.movie.save;

import com.cinemaprincess.genre.Genre;
import com.cinemaprincess.genre.GenreRepository;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.entity.MovieDetail;
import com.cinemaprincess.movie.entity.MovieDetailGenre;
import com.cinemaprincess.movie.entity.MovieDetailWatchProvider;
import com.cinemaprincess.movie.repository.MovieDetailRepository;
import com.cinemaprincess.movie.repository.MovieJdbcRepository;
import com.cinemaprincess.movie.repository.MovieRepository;
import com.cinemaprincess.watch_provider.WatchProvider;
import com.cinemaprincess.watch_provider.WatchProviderRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
@Transactional
public class SaveMovieDetail {
    String key = "8799558ac2f2609cd5ff89aa63a87f10";
    private final MovieRepository movieRepository;
    private final MovieJdbcRepository movieJdbcRepository;
    private final MovieDetailRepository movieDetailRepository;
    private final GenreRepository genreRepository;
    private final WatchProviderRepository watchProviderRepository;
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
        movieJdbcRepository.saveMovieDetailGenres(movieDetail.getMovieDetailGenres());
//        movieJdbcRepository.saveMovieDetailWatchProviders(movieDetail.getMovieDetailWatchProviders());
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
                .movieDetailGenres(movieDetailGenreList)
                .movieDetailWatchProviders(movieDetailWatchProviders)
                .build();
    }

    private List<MovieDetailGenre> parseMovieDetailGenres(JsonObject jsonObject) {
        JsonArray genreArray = jsonObject.getAsJsonArray("genres");

        return StreamSupport.stream(genreArray.spliterator(), false)
                .map(JsonElement::getAsJsonObject)
                .map(genreObject -> {
                    long genreId = genreObject.get("id").getAsLong();
                    Genre genre = genreRepository.findById(genreId).orElse(null);
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
        if (resultsObject.isJsonNull()) {
            return movieDetailWatchProviders;
        }
        JsonObject koreaObject = resultsObject.getAsJsonObject("KR");
        if (koreaObject.isJsonNull()) {
            return movieDetailWatchProviders;
        }

        JsonArray ottArray = ottArray = koreaObject.getAsJsonArray("flatrate");

        if (!ottArray.isJsonNull()) {
            for (JsonElement element : ottArray) {
                JsonObject ottObject = element.getAsJsonObject();

                WatchProvider watchProvider = new WatchProvider();
                long providerId = ottObject.get("provider_id").getAsLong();

                if (watchProviderRepository.existsById(providerId)) {
                    watchProvider = watchProviderRepository.findById(providerId).get();
                } else {
                    watchProvider.setProviderId(providerId);
                    watchProvider.setProviderName(ottObject.get("provider_name").getAsString());
                    watchProvider.setLogoPath(ottObject.get("logo_path").getAsString());
                    watchProviderRepository.save(watchProvider);
                }

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
}


