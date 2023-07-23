package com.cinemaprincess.cache;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class CacheData {
    private Map<String, Long> value;
    private LocalDateTime expirationDate;
}
