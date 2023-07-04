package com.cinemaprincess.movie.mapper;

import com.cinemaprincess.movie.dto.MovieDto;
import com.cinemaprincess.movie.entity.Movie;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MovieMapper {
    MovieDto.Response MovieToMovieResponseDto(Movie movie);
}
