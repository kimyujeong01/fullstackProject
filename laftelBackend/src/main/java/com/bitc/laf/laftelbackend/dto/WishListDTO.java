package com.bitc.laf.laftelbackend.dto;


import lombok.Data;

@Data
public class WishListDTO {
    private int seq;
    private String userId;
    private String aniIdx;
    private String aniTitle;
    private String aniImgUrl;
}