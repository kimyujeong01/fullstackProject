package com.bitc.laf.laftelbackend.service;

import com.bitc.laf.laftelbackend.dto.ViewingListDTO;
import com.bitc.laf.laftelbackend.mapper.MypageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService {

    private final MypageMapper mypageMapper;

    @Override
    public List<ViewingListDTO> selectView(String userId) throws Exception {
        return mypageMapper.selectView(userId);

    }

    //    보고싶다 서블릿
    @Override
    public List<ViewingListDTO> SelectMissyou(String userId) throws Exception {
        return mypageMapper.SelectMissyou(userId);
    }

    //    리뷰 서블릿
    @Override
    public List<ViewingListDTO> SelectReview(String userId) throws Exception {
        return mypageMapper.SelectReview(userId);
    }

    @Override
    public void DeleteReview(String aniIdx, String userId, int seq) throws Exception {
        mypageMapper.DeleteReview(aniIdx,userId,seq);
    }

    @Override
    public int SelectReviewSeq(String aniIdx, String userId) throws Exception {
        return mypageMapper.SelectReviewSeq(aniIdx,userId);
    }


}