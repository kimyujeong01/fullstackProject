package com.bitc.laf.laftelbackend.dto;

import lombok.Data;

@Data
public class ReviewDTO {
    private int seq;
    private int aniIdx;
    private String userId;
    private String content;
    private int great;
    private float starRating;
}
