package com.cinemaprincess.rank;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-22T22:10:21+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11.0.19 (Azul Systems, Inc.)"
)
@Component
public class MovieRankMapperImpl implements MovieRankMapper {

    @Override
    public MovieRankDto movieRankToMovieRankDto(MovieRank movieRank) {
        if ( movieRank == null ) {
            return null;
        }

        MovieRankDto movieRankDto = new MovieRankDto();

        movieRankDto.setMovieNm( movieRank.getMovieNm() );
        movieRankDto.setOpenDt( movieRank.getOpenDt() );
        movieRankDto.setAudiAcc( movieRank.getAudiAcc() );
        movieRankDto.setPosterPath( movieRank.getPosterPath() );
        movieRankDto.setMovieId( movieRank.getMovieId() );
        movieRankDto.setRank( movieRank.getRank() );

        return movieRankDto;
    }
}
