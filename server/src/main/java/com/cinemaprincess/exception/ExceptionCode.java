package com.cinemaprincess.exception;

import lombok.Getter;

public enum
ExceptionCode {
    USER_NOT_FOUND(404, "찾는 멤버가 없습니다."),
    USER_EMAIL_EXISTS(409, "이메일이 중복됩니다."),
    USER_USERNAME_EXISTS(409, "닉네임이 중복됩니다."),
    USER_INVALID_PASSWORD(404, "현재 비밀번호가 일치하지 않습니다."),
    REVIEW_NOT_FOUND(404,"리뷰가 없습니다."),
    DUPLICATE_REVIEW(409, "이미 해당 영화에 대한 리뷰를 작성하였습니다."),
    MOVIE_NOT_FOUND(404,"영화가 없습니다."),
    WATCH_LIST_EXISTS(409, "이미 리스트에 추가되어 있는 영화입니다."),
    WATCH_LIST_NOT_FOUND(404, "왓치리스트가 존재하지 않습니다."),
    WATCH_LIST_MOVIE_NOT_FOUND(404, "왓치리스트에 존재하지 않는 영화입니다."),
    OTT_NOT_FOUND(404, "ott 목록에 없습니다.");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
