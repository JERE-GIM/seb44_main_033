package com.cinemaprincess.rank;

import com.cinemaprincess.movie.service.MovieService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@RestController
@RequestMapping("/movieRank")
@Validated
@RequiredArgsConstructor
public class MovieRankController {
    private final MovieRankService movieRankService;

    @GetMapping("/save")
    public ResponseEntity<String> saveMovieRank(){
        String apiUrl = "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=0834fb150ecacc90905350aa06704133&targetDt=20230719";
        String jsonData = new RestTemplate().getForObject(apiUrl, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        try{
            JsonNode rootNode = objectMapper.readTree(jsonData);
            String boxofficeType = rootNode.get("boxofficeType").asText();
            String showRange = rootNode.get("showRange").asText();
            String rank = rootNode.get("rank").asText();
            String movieNm = rootNode.get("movieNm").asText();
            String openDt = rootNode.get("openDt").asText();

            movieRankService.saveMovieRank(boxofficeType,showRange,rank,movieNm,openDt);
        } catch (IOException e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
