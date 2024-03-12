package com.bitc.laf.laftelbackend.dto;


import lombok.Data;

@Data
public class UserDTO {
    private int seq;
    private String id;
    private String pw;
    private String name;
    private String email;
    private String membership;
    private String cookie;
    private String createDate;
    private String genre;
}
