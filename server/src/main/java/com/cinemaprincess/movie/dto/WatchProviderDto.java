package com.cinemaprincess.movie.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WatchProviderDto {
    public static class Response {
        private long providerId;
        private String providerName;
        private String logoPath;
    }
}
