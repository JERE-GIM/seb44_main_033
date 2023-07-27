package com.cinemaprincess.search.service;

import com.cinemaprincess.movie.dto.MovieSearchDto;
import com.cinemaprincess.movie.dto.MovieSearchResultDto;
import com.cinemaprincess.movie.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final MovieRepository movieRepository;

    public List<MovieSearchResultDto>searchMovies(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return movieRepository.findByKeyword(keyword, pageable);
    }
/*
    public List<MovieSearchDto>searchMoviesByGenre(String keyword, String genre) {
        return movieRepository.findByKeywordAndGenre(keyword, genre);
    }
*/
}
