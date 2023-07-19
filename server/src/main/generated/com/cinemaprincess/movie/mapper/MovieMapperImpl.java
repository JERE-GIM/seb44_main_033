package com.cinemaprincess.movie.mapper;

import com.cinemaprincess.movie.dto.MovieDto;
import com.cinemaprincess.movie.entity.Movie;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-19T07:44:20+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11.0.19 (Azul Systems, Inc.)"
)
@Component
public class MovieMapperImpl implements MovieMapper {

    @Override
    public List<MovieDto.Response> moviesToMovieResponseDtos(List<Movie> movies) {
        if ( movies == null ) {
            return null;
        }

        List<MovieDto.Response> list = new ArrayList<MovieDto.Response>( movies.size() );
        for ( Movie movie : movies ) {
            list.add( movieToMovieResponseDto( movie ) );
        }

        return list;
    }
}
