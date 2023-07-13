package com.cinemaprincess.user.dto;

import com.cinemaprincess.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Setter
@Getter
@AllArgsConstructor
public class UserStatisticsDto {
    private List<Long> genreIds;
}
