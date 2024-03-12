package com.bitc.laf.laftelbackend.service;

import com.bitc.laf.laftelbackend.dto.ReviewDTO;
import com.bitc.laf.laftelbackend.mapper.DetailMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DetailServiceImpl implements DetailService {

    private final DetailMapper detailMapper;

    @Override
    public int wishCheck(String userId, String aniIdx) throws Exception {
        return detailMapper.wishCheck(userId,aniIdx);
    }

    @Override
    public void wishDelete(String userId, String aniIdx) throws Exception {
        detailMapper.wishDelete(userId,aniIdx);
    }

    @Override
    public void wishInsert(String userId, String aniIdx, String aniTitle, String aniImgUrl) throws Exception {
        detailMapper.wishInsert(userId,aniIdx,aniTitle,aniImgUrl);
    }


    @Override
    public int viewingCheck(String userId, String aniIdx) throws Exception {
        return detailMapper.viewingCheck(userId,aniIdx);
    }

    @Override
    public void viewingDelete(String userId, String aniIdx) throws Exception {
        detailMapper.viewingDelete(userId,aniIdx);
    }

    @Override
    public void viewingInsert(String userId, String aniIdx, String aniTitle, String aniImgUrl) throws Exception {
        detailMapper.viewingInsert(userId,aniIdx,aniTitle,aniImgUrl);
    }


    @Override
    public int reviewCheck(int aniIdx, String userId) throws Exception {
        return detailMapper.reviewCheck(aniIdx,userId);
    }

    @Override
    public void reviewUpdate(ReviewDTO review) throws Exception {
        detailMapper.reviewUpdate(review);
    }

    @Override
    public void reviewInsert(ReviewDTO review) throws Exception {
        detailMapper.reviewInsert(review);
    }

    @Override
    public ReviewDTO selectAllReview(int aniIdx, String userId) throws Exception {
        return detailMapper.selectAllReview(aniIdx,userId);
    }

    @Override
    public List<ReviewDTO> AllReview(String aniId) throws Exception {
        return detailMapper.AllReview(aniId);
    }


}