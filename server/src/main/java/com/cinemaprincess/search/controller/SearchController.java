package com.cinemaprincess.search.controller;

import com.cinemaprincess.search.service.SearchService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/search")
public class SearchController {
    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }
/*
    @GetMapping("/{keyword}")
    public ResponseEntity<List<MovieBySearchDto>> searchMovies(@PathVariable("keyword") String keyword) {
        return ResponseEntity.status(HttpStatus.OK).body(searchService.searchMovies(keyword));
    }

    @GetMapping("/{genre}/{keyword}")
    public ResponseEntity<List<MovieBySearchDto>> searchMoviesWithGenre(@PathVariable("keyword") String keyword,
                                                                        @PathVariable("genre") String genre) {
        return ResponseEntity.status(HttpStatus.OK).body(searchService.searchMoviesWithGenre(keyword));
    }
*/
}
