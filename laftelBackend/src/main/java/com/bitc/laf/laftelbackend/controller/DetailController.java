package com.bitc.laf.laftelbackend.controller;

import com.bitc.laf.laftelbackend.dto.ReviewDTO;
import com.bitc.laf.laftelbackend.service.DetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/aniDetail")
@RestController
public class DetailController {

    private final DetailService detailService;

    @PostMapping("/wish")
    public Object wishList(@RequestBody Map<String,String> userInfo) throws Exception {
        String userId = userInfo.get("userId");
        String aniIdx = userInfo.get("aniIdx");
        Boolean Check = false;

        int wishCK = detailService.wishCheck(userId,aniIdx);

        if (wishCK == 1){
            Check = true;
        }else {
            Check = false;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("result", Check);

        return result;
    }


    @PostMapping("/wishCheck")
    public Object wishCheck(@RequestBody Map<String,String> userInfo) throws Exception {
        String userId = userInfo.get("userId");
        String aniIdx = userInfo.get("aniIdx");

        String aniTitle = userInfo.get("aniTitle");
        String aniImgUrl = userInfo.get("aniImgUrl");

        Boolean Check = false;

        int wishCK = detailService.wishCheck(userId,aniIdx);

        if (wishCK == 1){
            detailService.wishDelete(userId,aniIdx);
            Check = false;
        }else {
            detailService.wishInsert(userId,aniIdx,aniTitle,aniImgUrl);
            Check = true;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("result", Check);

        return result;
    }


    @PostMapping("/viewing")
    public Object viewingList(@RequestBody Map<String,String> userInfo) throws Exception {
        String userId = userInfo.get("userId");
        String aniIdx = userInfo.get("aniIdx");
        Boolean Check = false;

        int wishCK = detailService.viewingCheck(userId,aniIdx);

        if (wishCK == 1){
            Check = true;
        }else {
            Check = false;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("result", Check);

        return result;
    }


    @PostMapping("/viewingCheck")
    public Object viewingCheck(@RequestBody Map<String,String> userInfo) throws Exception {
        String userId = userInfo.get("userId");
        String aniIdx = userInfo.get("aniIdx");

        String aniTitle = userInfo.get("aniTitle");
        String aniImgUrl = userInfo.get("aniImgUrl");

        Boolean Check = false;

        int wishCK = detailService.viewingCheck(userId,aniIdx);

        if (wishCK == 1){
            detailService.viewingDelete(userId,aniIdx);
            Check = false;
        }else {
            detailService.viewingInsert(userId,aniIdx,aniTitle,aniImgUrl);
            Check = true;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("result", Check);

        return result;
    }

    @PostMapping("/reviewInsert")
    public Object reviewInsert(@RequestBody Map<String,String> reviewInfo) throws Exception {
        ReviewDTO review = new ReviewDTO();

        review.setAniIdx(Integer.parseInt(reviewInfo.get("aniIdx")));
        review.setUserId(reviewInfo.get("userId"));
        review.setStarRating(Float.parseFloat(reviewInfo.get("star")));
        review.setContent(reviewInfo.get("content"));

        int reviewCK = detailService.reviewCheck(review.getAniIdx(),review.getUserId());


        if (reviewCK == 1) {
            ReviewDTO reInfo = detailService.selectAllReview(review.getAniIdx(),review.getUserId());
            review.setSeq(reInfo.getSeq());


            System.out.println(review);
            detailService.reviewUpdate(review);
        } else {
            detailService.reviewInsert(review);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("result", "Check");

        return result;
    }


    @PostMapping("/review")
    public Object reviewCheck(@RequestBody Map<String,String> userInfo) throws Exception {
        String userId = userInfo.get("userId");
        String aniIdx = userInfo.get("aniIdx");
        Boolean Check = false;

        int reviewCK = detailService.reviewCheck(Integer.parseInt(aniIdx),userId);

        if (reviewCK == 1){
            Check = true;
        }else {
            Check = false;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("result", Check);

        return result;
    }

    @PostMapping("/comment")
    public Object CommentInfo(@RequestBody ReviewDTO postData)throws Exception {


        String aniId = String.valueOf(postData.getAniIdx());


        List<ReviewDTO> reviewInfo = detailService.AllReview(aniId);
        List<Object> transformedData = reviewInfo.stream()
                .map(review -> {
                    return new Object() {
                        public int id = review.getSeq();
                        public String content = review.getContent();

                        public Object profile = new Object() {
                            public String name  = review.getUserId();
                        };
                        public int score = (int) review.getStarRating();
                    };
                })
                .collect(Collectors.toList());



        return transformedData;
    }



}