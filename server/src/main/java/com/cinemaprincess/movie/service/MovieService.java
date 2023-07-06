package com.cinemaprincess.movie.service;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.repository.MovieRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MovieService {
    private final MovieRepository movieRepository;
    String key = "8799558ac2f2609cd5ff89aa63a87f10";

    @PostConstruct
    public void initialize() {
        getMovieList();
    }

    public void getMovieList() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders httpHeaders = new HttpHeaders();
            HttpEntity<?> entity = new HttpEntity<>(httpHeaders);

            String tmdbUrl = "https://api.themoviedb.org/3/discover/movie?api_key=8799558ac2f2609cd5ff89aa63a87f10&release_date.gte=1950-01-01&watch_region=KR&language=ko-KR";

            UriComponents uri = UriComponentsBuilder.fromHttpUrl(tmdbUrl).build();

            ResponseEntity<String> response = restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, String.class);
            String responseBody = response.getBody();

            JsonParser jsonParser = new JsonParser();
            JsonObject jsonObject = (JsonObject) jsonParser.parse(responseBody);
            JsonArray list = (JsonArray) jsonObject.get("results");

            for (int i = 0; i < list.size(); i++) {
                JsonObject contents = (JsonObject) list.get(i);

                movieRepository.save(
                        Movie.builder()
                                .title(contents.get("title").toString())
                                .id(contents.get("id").getAsLong())
                                .originalTitle(contents.get("original_title").toString())
                                .posterPath(contents.get("poster_path").toString())
                                .releaseDate(contents.get("release_date").toString())
                                .build()
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

//    public int getPages() {
//        int page = 0;
//
//        try {
//            String url = "https://api.themoviedb.org/3/discover/movie?" + "api_key=" + key
//                    + "&release_date.gte=1950-01-01&watch_region=kr&language=ko";
//
//            RestTemplate restTemplate = new RestTemplate();
//            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
//            String result = response.getBody();
//
//            JSONParser jsonParser = new JSONParser(result);
//            JSONObject jsonObject = (JSONObject) jsonParser.parse();
//            String pages = jsonObject.get("total_pages").toString();
//            page = Integer.parseInt(pages);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return page;
//    }

}
