package com.cinemaprincess.movie.watch_provider;

import lombok.Getter;
import lombok.Setter;

public class WatchProviderDto {
    @Getter
    @Setter
    public static class Response {
        private long providerId;
        private String providerName;
        private String logoPath;
    }
}
