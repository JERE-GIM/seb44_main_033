package com.cinemaprincess.movie.watch_provider.controller;

import com.cinemaprincess.movie.watch_provider.entity.WatchProvider;
import com.cinemaprincess.movie.watch_provider.entity.WatchProviderMap;
import com.cinemaprincess.movie.watch_provider.repository.WatchProviderRepository;
import com.cinemaprincess.movie.watch_provider.service.WatchProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.List;

@RestController
@RequestMapping("/providers")
@RequiredArgsConstructor
public class ProviderController {
    private final WatchProviderService watchProviderService;
    private final WatchProviderRepository watchProviderRepository;
    private final WatchProviderMap watchProviderMap;

    @PostMapping("/save")
    public ResponseEntity saveProviders() {
        watchProviderService.getProviderList();

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostConstruct
    public void saveProviderMap() {
        List<WatchProvider> watchProviderList = watchProviderRepository.findAll();
        for (WatchProvider watchProvider : watchProviderList) {
            watchProviderMap.addWatchProvider(watchProvider);
        }
    }
}
