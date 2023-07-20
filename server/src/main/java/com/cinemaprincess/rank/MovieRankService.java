package com.cinemaprincess.rank;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieRankService {
    private final MovieRankRepository movieRankRepository;
    private final MovieRepository movieRepository;
    private final MovieRankMapper movieRankMapper;

    @Transactional
    public void saveMovieRank(String rank, String movieNm, String openDt,String audiAcc){
        MovieRank movieRank = new MovieRank();
//        movieRank.setBoxofficeType(boxofficeType);
//        movieRank.setShowRange(showRange);
        movieRank.setRank(rank);
        movieRank.setMovieNm(movieNm);
        movieRank.setOpenDt(openDt);
        movieRank.setAudiAcc(audiAcc);

        Movie movie = movieRepository.findByTitle(movieNm);
        movieRank.setMovie(movie);
        movieRankRepository.save(movieRank);
    }

    public Page<MovieRankDto> getMovieRankList(Pageable pageable){
        Page<MovieRank> movieRankPage = movieRankRepository.findAll(pageable);
        return movieRankPage.map(movieRankMapper::movieToMovieRankDto);
    }

}
