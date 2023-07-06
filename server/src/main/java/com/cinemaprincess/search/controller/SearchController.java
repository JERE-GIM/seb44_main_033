package com.cinemaprincess.search.controller;

import com.cinemaprincess.movie.dto.MovieSearchDto;
import com.cinemaprincess.movie.dto.MovieSearchResultDto;
import com.cinemaprincess.search.service.SearchService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/search")
public class SearchController {
    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<List<MovieSearchResultDto>> searchMovies(@RequestParam("keyword") String keyword,
                                                                   @RequestParam("page") int page,
                                                                   @RequestParam("size") int size) {
        return ResponseEntity.status(HttpStatus.OK).body(searchService.searchMovies(keyword, page, size));
    }

/*
    @GetMapping("/{genre}/{keyword}")
    public ResponseEntity<List<MovieSearchDto>> searchMoviesByGenre(@PathVariable("keyword") String keyword,
                                                                    @PathVariable("genre") String genre) {
        return ResponseEntity.status(HttpStatus.OK).body(searchService.searchMoviesByGenre(keyword, genre));
    }
*/
}
