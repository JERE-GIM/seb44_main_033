package com.cinemaprincess.movie.watch_provider.entity;

import com.cinemaprincess.movie.watch_provider.repository.WatchProviderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class WatchProviderMap {
    private Map<Long, WatchProvider> providerMap = new HashMap<>();
    private final WatchProviderRepository watchProviderRepository;

    public void addWatchProvider(WatchProvider watchProvider) {
        providerMap.put(watchProvider.getProviderId(), watchProvider);
    }

    public WatchProvider getProviderById(Long providerId) {
        return providerMap.get(providerId);
    }
}
