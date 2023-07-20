package com.cinemaprincess.rank;

import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieRankService {
    private final MovieRankRepository movieRankRepository;
    private final MovieRepository movieRepository;
    private final MovieRankMapper movieRankMapper;

//    @Transactional
//    public void saveMovieRank(String rank, String movieNm, String openDt,String audiAcc){
//        movieRankRepository.deleteAll();
//        MovieRank movieRank = new MovieRank();
//        movieRank.setRank(rank);
//        movieRank.setMovieNm(movieNm);
//        movieRank.setOpenDt(openDt);
//        movieRank.setAudiAcc(audiAcc);
//
//        Movie movie = movieRepository.findByTitle(movieNm);
//        movieRank.setMovie(movie);
//        movieRankRepository.save(movieRank);
//    }

    @Transactional
    public void saveMovieRank(List<MovieRankDto> movieRankDtoList) {
        // 트랜잭션 분리: 기존 데이터 모두 삭제
        deleteAllMovieRank();

        // 새로운 데이터 추가
        for (MovieRankDto movieRankDto : movieRankDtoList) {
            MovieRank movieRank = new MovieRank();
            movieRank.setRank(movieRankDto.getRank());
            movieRank.setMovieNm(movieRankDto.getMovieNm());
            movieRank.setOpenDt(movieRankDto.getOpenDt());
            movieRank.setAudiAcc(movieRankDto.getAudiAcc());

            Movie movie = movieRepository.findByTitle(movieRankDto.getMovieNm());
            if (movie != null) {
                movieRank.setPosterPath(movie.getPosterPath());
                movieRank.setMovieId(String.valueOf(movie.getMovieId()));
            } else {
                movieRank.setPosterPath("default_poster_path.jpg");
                movieRank.setMovieId("-1"); // 또는 다른 기본값을 설정할 수 있음
            }

            movieRankRepository.save(movieRank);
        }
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void deleteAllMovieRank() {
        movieRankRepository.deleteAll();
    }

    public Page<MovieRankDto> getMovieRankList(Pageable pageable){
        Page<MovieRank> movieRankPage = movieRankRepository.findAll(pageable);
        return movieRankPage.map(movieRankMapper::movieRankToMovieRankDto);
    }

}
