package com.cinemaprincess.watchlist.service;

import com.cinemaprincess.exception.BusinessLogicException;
import com.cinemaprincess.exception.ExceptionCode;
import com.cinemaprincess.movie.entity.Movie;
import com.cinemaprincess.movie.repository.MovieRepository;
import com.cinemaprincess.user.entity.User;
import com.cinemaprincess.user.repository.UserRepository;
import com.cinemaprincess.watchlist.dto.MovieDto;
import com.cinemaprincess.watchlist.dto.WatchlistDto;
import com.cinemaprincess.watchlist.entity.Watchlist;
import com.cinemaprincess.watchlist.entity.WatchlistMovie;
import com.cinemaprincess.watchlist.repository.WatchlistMovieRepository;
import com.cinemaprincess.watchlist.repository.WatchlistRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WatchlistService {
    private final WatchlistRepository watchlistRepository;
    private final WatchlistMovieRepository watchlistMovieRepository;
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;

    // User Watchlist 생성
    public Watchlist createWatchlist(Long userId) {
        User user = userRepository.findByUserId(userId);
        Watchlist watchlist = new Watchlist();
        watchlist.setUser(user);
        watchlist.setCount(0);

        return watchlistRepository.save(watchlist);
    }

    // User WatchlistMovies 생성
    public WatchlistMovie createWatchlistMovie(Long watchlistId, Movie movie) {
        Watchlist watchlist = watchlistRepository.findByWatchlistId(watchlistId);
        WatchlistMovie watchlistMovie = new WatchlistMovie();
        watchlistMovie.setWatchlist(watchlist);
        watchlistMovie.setMovie(movie);

        return watchlistMovieRepository.save(watchlistMovie);
    }

    // Watchlist 에 Movie 추가
    public void addMovieToWatchlist(Long userId, Long movieId) {
        User user = userRepository.findByUserId(userId);
        Movie newMovie = movieRepository.findByMovieId(movieId);

        Watchlist watchlist = user.getWatchlist();

        // Watchlist 가 비어있다면 생성
        if (watchlist == null) {
            watchlist = createWatchlist(userId);
        }

        // Watchlist 에 들어갈 Movie 생성
        Movie movie = movieRepository.findByMovieId(newMovie.getMovieId());
        WatchlistMovie watchlistMovie = watchlistMovieRepository.findByWatchlistWatchlistIdAndMovieMovieId(watchlist.getWatchlistId(),
                movie.getMovieId());

        // 추가하고자 하는 Movie 가 Watchlist 에 없다면 생성, 이미 존재한다면 예외 처리
        if(watchlistMovie == null) {
            Long watchlistId = user.getWatchlist().getWatchlistId();
            watchlistMovie = createWatchlistMovie(watchlistId, movie);
            watchlist.setCount(watchlist.getCount() + 1);
            watchlistMovieRepository.save(watchlistMovie);
        } else {
            throw new BusinessLogicException(ExceptionCode.WATCH_LIST_EXISTS);
        }
    }

    // 해당 User 의 장바구니 조회
    public WatchlistDto findUserWatchlist(Long userId) {
        User user = userRepository.findByUserId(userId);
        Watchlist watchlist = user.getWatchlist();
        List<MovieDto> dtoList = findMovieFromWatchlist(userId);

        WatchlistDto watchlistDto = new WatchlistDto();
        watchlistDto.setWatchlistId(watchlist.getWatchlistId());
        watchlistDto.setUserId(watchlist.getUser().getUserId());
        watchlistDto.setCount(watchlist.getCount());
        watchlistDto.setCreatedAt(watchlist.getCreatedAt());
        watchlistDto.setWatchlistMovies(dtoList);

        return watchlistDto;
    }

    // 해당 User Watchlist 의 Movie 조회
    public List<MovieDto> findMovieFromWatchlist(Long userId) {
        User user = userRepository.findByUserId(userId);
        Watchlist watchlist = user.getWatchlist();

        List<WatchlistMovie> watchlistMovies = watchlist.getWatchlistMovies();

        List<MovieDto> dtoList = new ArrayList<>();
        for(WatchlistMovie watchlistMovie : watchlistMovies) {
            MovieDto dto = new MovieDto();
            dto.setWatchlistId(watchlist.getWatchlistId());
            dto.setMovieId(watchlistMovie.getMovie().getMovieId());
            dto.setCreatedAt(watchlistMovie.getCreatedAt());
            dto.setTitle(watchlistMovie.getMovie().getTitle());
            dto.setPosterPath(watchlistMovie.getMovie().getPosterPath());
            dto.setReleaseDate(watchlistMovie.getMovie().getMovieDetail().getReleaseDate());
            dtoList.add(dto);
        }

        return dtoList;
    }

    // Watchlist 의 Movie 삭제
    public void deleteMovieFromWatchlist(Long userId, Long movieId) {
        User user = userRepository.findByUserId(userId);
        Watchlist watchlist = user.getWatchlist();

        if (watchlist == null) {
            throw new BusinessLogicException(ExceptionCode. WATCH_LIST_NOT_FOUND);
        }

        WatchlistMovie watchlistMovie = watchlistMovieRepository.findByMovieMovieId(movieId);

        // 삭제하고자 하는 Movie 가 Watchlist 에 없다면 예외 처리, 존재한다면 삭제
        if(watchlistMovie == null) {
            throw new BusinessLogicException(ExceptionCode.WATCH_LIST_MOVIE_NOT_FOUND);
        } else {
            watchlistMovieRepository.delete(watchlistMovie);
            watchlist.setCount(watchlist.getCount() - 1);
            watchlistRepository.save(watchlist);
        }
    }

    // Watchlist 의 Movie 전체 삭제
    public void deleteAllMovieFromWatchlist(Long userId) {
        User user = userRepository.findByUserId(userId);
        List<WatchlistMovie> watchListMovies = watchlistMovieRepository.findAll();

        for(WatchlistMovie watchlistMovie : watchListMovies) {
            if(watchlistMovie.getWatchlist().getUser().getUserId() == user.getUserId()) {
                watchlistMovie.getWatchlist().setCount(0);
                watchlistMovieRepository.delete(watchlistMovie);
            }
        }
    }
}
