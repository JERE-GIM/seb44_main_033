package com.cinemaprincess.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Setter
@Getter
@AllArgsConstructor
public class UserStatisticsDto {
    private List<String> genreNames;
}
