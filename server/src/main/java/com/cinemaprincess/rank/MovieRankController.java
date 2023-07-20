package com.cinemaprincess.rank;

import com.cinemaprincess.movie.service.MovieService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/movieRank")
@Validated
@RequiredArgsConstructor
@Slf4j
public class MovieRankController {
    private final MovieRankService movieRankService;

    @GetMapping("/save")
    public ResponseEntity<String> saveMovieRank()throws JsonProcessingException {
//        DailyBoxOffice dailyBoxOffice1 = new DailyBoxOffice();
        String apiUrl = "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=0834fb150ecacc90905350aa06704133&targetDt=20230719";

        RestTemplate restTemplate = new RestTemplate();
        MovieInfo movieInfo = restTemplate.getForObject(apiUrl, MovieInfo.class);
        BoxOfficeResult boxOfficeResult = movieInfo.getBoxOfficeResult();

        // 영화 정보 출력 예시
        for (DailyBoxOffice dailyBoxOffice : boxOfficeResult.getDailyBoxOfficeList()) {
            log.info("순위: " + dailyBoxOffice.getRank());
            log.info("영화 제목: " + dailyBoxOffice.getMovieNm());
            log.info("개봉 일자: " + dailyBoxOffice.getOpenDt());
            //여기서 dailyBoxOffice를 movierank로 변환시켜서 저장
            movieRankService.saveMovieRank(dailyBoxOffice.getRank(), dailyBoxOffice.movieNm, dailyBoxOffice.openDt);
        }


        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Data
    static class MovieInfo  {
        private BoxOfficeResult boxOfficeResult;
    }

    @Data
    static class  BoxOfficeResult {
        private String boxofficeType;
        private String showRange;
        private List<DailyBoxOffice> dailyBoxOfficeList;
    }
    @Data
    static class   DailyBoxOffice {
        private String rnum;
        private String rank;
        private String rankInten;
        private String rankOldAndNew;
        private String movieCd;
        private String movieNm;
        private String openDt;
        private String salesAmt;
        private String salesShare;
        private String salesInten;
        private String salesChange;
        private String salesAcc;
        private String audiCnt;
        private String audiInten;
        private String audiChange;
        private String audiAcc;
        private String scrnCnt;
        private String showCnt;
    }
}
