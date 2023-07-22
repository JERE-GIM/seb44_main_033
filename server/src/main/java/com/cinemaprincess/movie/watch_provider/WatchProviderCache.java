package com.cinemaprincess.movie.watch_provider;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class WatchProviderCache {
    private Map<Long, WatchProvider> providerMap = new HashMap<>();

    public void addWatchProvider(WatchProvider watchProvider) {
        providerMap.put(watchProvider.getProviderId(), watchProvider);
    }

    public WatchProvider getProviderById(Long providerId) {
        return providerMap.get(providerId);
    }
}
