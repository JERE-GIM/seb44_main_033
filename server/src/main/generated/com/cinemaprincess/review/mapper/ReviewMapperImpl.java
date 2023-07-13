package com.cinemaprincess.review.mapper;

import com.cinemaprincess.review.dto.ReviewPatchDto;
import com.cinemaprincess.review.dto.ReviewResponseDto;
import com.cinemaprincess.review.entity.Review;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-13T20:00:59+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11.0.19 (Azul Systems, Inc.)"
)
@Component
public class ReviewMapperImpl implements ReviewMapper {

    @Override
    public Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto) {
        if ( reviewPatchDto == null ) {
            return null;
        }

        Review review = new Review();

        review.setReviewId( reviewPatchDto.getReviewId() );
        review.setContent( reviewPatchDto.getContent() );
        review.setScore( reviewPatchDto.getScore() );

        return review;
    }

    @Override
    public List<ReviewResponseDto> reviewsToReviewResponseDtos(List<Review> reviews) {
        if ( reviews == null ) {
            return null;
        }

        List<ReviewResponseDto> list = new ArrayList<ReviewResponseDto>( reviews.size() );
        for ( Review review : reviews ) {
            list.add( reviewToReviewResponseDto( review ) );
        }

        return list;
    }
}
