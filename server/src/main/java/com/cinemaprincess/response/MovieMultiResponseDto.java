package com.cinemaprincess.response;

import com.cinemaprincess.review.dto.ReviewResponseDto;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MovieMultiResponseDto<T> {
    private T data;
    private List<ReviewResponseDto> reviews;
    private PageInfo pageInfo;

    public MovieMultiResponseDto(T data, List<ReviewResponseDto> reviews, Page page) {
        this.data = data;
        this.reviews = reviews;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
