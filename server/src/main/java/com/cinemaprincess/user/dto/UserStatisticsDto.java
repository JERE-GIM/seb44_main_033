package com.cinemaprincess.user.dto;

import com.cinemaprincess.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@AllArgsConstructor
@Setter
@Getter
public class UserStatisticsDto {
    private List<String> genre;
    private User.Gender gender;

}
