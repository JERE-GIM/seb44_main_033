package com.cinemaprincess.exception;

import lombok.Getter;

public enum
ExceptionCode {
    USER_NOT_FOUND(404, "찾는 멤버가 없습니다."),
    USER_EMAIL_EXISTS(409, "이메일이 중복됩니다."),
    REVIEW_NOT_FOUND(404,"리뷰가 없습니다.");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
