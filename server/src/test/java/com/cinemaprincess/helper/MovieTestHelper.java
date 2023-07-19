package com.cinemaprincess.helper;

import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

public interface MovieTestHelper {
    String key = "8799558ac2f2609cd5ff89aa63a87f10";

    RestTemplate restTemplate = new RestTemplate();

    // api url
    default String buildMovieListUrl(String startDate, String endDate, int page) {
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/discover/movie")
                .queryParam("api_key", key)
                .queryParam("primary_release_date.gte", startDate)
                .queryParam("primary_release_date.lte", endDate)
                .queryParam("language", "ko")
                .queryParam("page", page)
                .build()
                .toUriString();
    }
}