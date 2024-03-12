package com.bitc.laf.laftelbackend.service;

import com.bitc.laf.laftelbackend.dto.ReviewDTO;

import java.util.List;

public interface DetailService {
    int wishCheck(String userId, String aniIdx) throws Exception;

    void wishDelete(String userId, String aniIdx) throws Exception;

    void wishInsert(String userId, String aniIdx, String aniTitle, String aniImgUrl) throws Exception;

    int viewingCheck(String userId, String aniIdx) throws Exception;

    void viewingDelete(String userId, String aniIdx) throws Exception;

    void viewingInsert(String userId, String aniIdx, String aniTitle, String aniImgUrl) throws Exception;

    int reviewCheck(int aniIdx, String userId) throws Exception;

    void reviewUpdate(ReviewDTO review) throws Exception;

    void reviewInsert(ReviewDTO review) throws Exception;

    ReviewDTO selectAllReview(int aniIdx, String userId) throws Exception;

    List<ReviewDTO> AllReview(String aniId)throws Exception;
}