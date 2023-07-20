package com.cinemaprincess.rank;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieRankService {
    private final MovieRankRepository movieRankRepository;

    @Transactional
    public void saveMovieRank(String rank, String movieNm, String openDt){
        MovieRank movieRank = new MovieRank();
//        movieRank.setBoxofficeType(boxofficeType);
//        movieRank.setShowRange(showRange);
        movieRank.setRank(rank);
        movieRank.setMovieNm(movieNm);
        movieRank.setOpenDt(openDt);

        movieRankRepository.save(movieRank);
    }
//    @Transactional
//    public void saveMovieRanks(List<MovieRank> movieRanks){
//        movieRankRepository.saveAll(movieRanks);
//    }

}
