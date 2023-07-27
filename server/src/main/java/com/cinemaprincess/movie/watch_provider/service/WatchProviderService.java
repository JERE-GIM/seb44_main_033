package com.cinemaprincess.movie.watch_provider.service;

import com.cinemaprincess.movie.watch_provider.entity.WatchProvider;
import com.cinemaprincess.movie.watch_provider.entity.WatchProviderMap;
import com.cinemaprincess.movie.watch_provider.repository.WatchProviderRepository;
import com.cinemaprincess.utils.RestTemplateConfig;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class WatchProviderService {
    private final WatchProviderRepository watchProviderRepository;
    private final WatchProviderMap watchProviderMap;
    private final RestTemplateConfig restTemplateConfig;

    @Value("${tmdb.key}")
    String key;

    public String buildProviderUrl() {
        return UriComponentsBuilder.fromHttpUrl("https://api.themoviedb.org/3/watch/providers/movie")
                .queryParam("api_key", key)
                .build()
                .toUriString();
    }

    public void getProviderList() {
        try {
            String url = buildProviderUrl();
            List<WatchProvider> watchProviders = parseProviderList(restTemplateConfig.restTemplate(url));

            for (WatchProvider provider : watchProviders) {
                watchProviderMap.addWatchProvider(provider);
            }

            watchProviderRepository.saveAll(watchProviders);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<WatchProvider> parseProviderList(String responseBody) {
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = jsonParser.parse(responseBody).getAsJsonObject();
        JsonArray providerArray = jsonObject.getAsJsonArray("results");

        List<WatchProvider> watchProviders = new ArrayList<>();
        for (JsonElement element : providerArray) {
            JsonObject providerObject = element.getAsJsonObject();
            long providerId = providerObject.get("provider_id").getAsLong();
            String link = "";
            WatchProvider watchProvider = new WatchProvider();

            switch ((int) providerId) {
                case 8:
                case 1796:
                    link = "https://www.netflix.com/kr/";
                    break;
                case 119:
                    link = "https://www.primevideo.com";
                    break;
                case 337:
                    link = "https://www.disneyplus.com/ko-kr";
                    break;
                case 356:
                    link = "https://www.wavve.com";
                    break;
                case 97:
                    link = "https://www.watcha.com";
                    break;
                case 350:
                    link = "https://www.apple.com/kr/apple-tv-plus/";
                    break;
                default:
                    continue;
            }

            watchProvider.setProviderId(providerId);
            watchProvider.setProviderName(providerObject.get("provider_name").getAsString());
            watchProvider.setLogoPath(providerObject.get("logo_path").getAsString());
            watchProvider.setLink(link);

            watchProviders.add(watchProvider);
        }

        return watchProviders;
    }
}
