package com.bitc.laf.laftelbackend.controller;


import com.bitc.laf.laftelbackend.dto.ViewingListDTO;
import com.bitc.laf.laftelbackend.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")  // CORS 설정: 프론트엔드에서의 요청을 허용하는 설정
@RequestMapping("/mypage")  // 이 컨트롤러의 기본 URL 경로
@RequiredArgsConstructor  // Lombok 어노테이션: final 필드를 가진 생성자를 자동으로 생성
@RestController  // RESTful API를 처리하는 컨트롤러임을 선언
public class MyPageController {
    private final MypageService mypageService;  // MypagcService 의존성 주입

    //    보는중 컨트롤러
    @PostMapping("view")
    public Object selectView(@RequestBody Map<String, String> userInfo) throws Exception {
        String userId = userInfo.get("userId");

        List<ViewingListDTO> selectViewList = mypageService.selectView(userId);

        Map<String, Object> result = new HashMap<>();
        result.put("result", selectViewList);

        return result;
    }

    //    보고싶다 컨트롤러
    @PostMapping("/missyou")
    public Object SelectMissyou(@RequestBody Map<String, String> userInfo) throws Exception {
        String userId = userInfo.get("userId");
        List<ViewingListDTO> missyouList = mypageService.SelectMissyou(userId);

        Map<String, Object> result = new HashMap<>();
        result.put("result", missyouList);

        return result;
    }

    //    리뷰 컨트롤러
    @PostMapping("/review")
    public Object SelectReview(@RequestBody Map<String, String> userInfo) throws Exception {
        String userId = userInfo.get("userId");
        List<ViewingListDTO> reviewList = mypageService.SelectReview(userId);

        Map<String, Object> result = new HashMap<>();
        result.put("result", reviewList);

        return result;
    }


    @PostMapping("/reviewDelete")
    public Object DeleteReview(@RequestBody Map<String, String> userInfo) throws Exception {

        System.out.println(userInfo);
        String aniIdx = userInfo.get("aniIdx");
        String userId = userInfo.get("userId");

        int seq = mypageService.SelectReviewSeq(aniIdx, userId);

        mypageService.DeleteReview(aniIdx, userId, seq);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "삭제완료");

        return result;
    }


}