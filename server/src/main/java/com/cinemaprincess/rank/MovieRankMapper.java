package com.cinemaprincess.rank;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MovieRankMapper {
    @Mapping(source = "movieNm", target = "movieNm")
    @Mapping(source = "openDt", target = "openDt")
    @Mapping(source = "audiAcc", target = "audiAcc")
    @Mapping(source = "movie.posterPath", target = "posterPath")
    MovieRankDto movieToMovieRankDto(MovieRank movieRank);
}
