package com.bitc.laf.laftelbackend.dto;

import lombok.Data;

@Data
public class ViewingListDTO {

    private int seq;
    private String userId;
    private String aniIdx;
    private String aniTitle;
    private String aniImgUrl;
}