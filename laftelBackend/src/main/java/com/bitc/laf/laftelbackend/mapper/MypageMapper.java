package com.bitc.laf.laftelbackend.mapper;

import com.bitc.laf.laftelbackend.dto.ViewingListDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MypageMapper {

    // 보는중 맵퍼
//    List<ViewingListDTO> SelectViewing(String userId) throws Exception;
    List<ViewingListDTO> selectView(String userId) throws Exception;

    //    보고싶다 맵퍼
    List<ViewingListDTO> SelectMissyou(String userId) throws Exception;

    //    리뷰 맴퍼
    List<ViewingListDTO> SelectReview(String userId) throws Exception;

    void DeleteReview(String aniIdx, String userId, int seq) throws Exception;

    int SelectReviewSeq(String aniIdx, String userId) throws Exception;
}