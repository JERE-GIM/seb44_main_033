package com.cinemaprincess.genre;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class GenreService {
    String key = "8799558ac2f2609cd5ff89aa63a87f10";
    private final GenreRepository genreRepository;
    private final GenreCache genreCache;
    RestTemplate restTemplate = new RestTemplate();

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
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
            String responseBody = response.getBody();
            List<Genre> genres = parseGenreList(responseBody);

            // 장르를 캐시에 추가
            for (Genre genre : genres) {
                genreCache.addGenre(genre);
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
}
