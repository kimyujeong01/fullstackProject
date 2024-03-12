package com.bitc.laf.laftelbackend.service;

import com.bitc.laf.laftelbackend.dto.ViewingListDTO;

import java.util.List;

public interface MypageService {

    //  보는중 서비스
//    List<ViewingListDTO> SelectViewing(String userId) throws Exception;
    List<ViewingListDTO> selectView(String userId) throws Exception;


    //    보고싶다 서비스
    List<ViewingListDTO> SelectMissyou(String userId)throws Exception;

    //    리뷰 서비스
    List<ViewingListDTO> SelectReview(String userId)throws Exception;

    void DeleteReview(String aniIdx, String userId, int seq) throws Exception;

    int SelectReviewSeq(String aniIdx, String userId) throws Exception;
}