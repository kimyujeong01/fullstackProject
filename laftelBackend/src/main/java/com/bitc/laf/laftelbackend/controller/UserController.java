package com.bitc.laf.laftelbackend.controller;

import com.bitc.laf.laftelbackend.dto.UserDTO;
import com.bitc.laf.laftelbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @GetMapping("/check")
    public Object userCheck(@RequestParam("id") String id) throws Exception {
        int Check = userService.userCheck(id);

        Map<String, Object> result = new HashMap<>();
        result.put("result", Check);

        return result;
    }


    @PostMapping("/insert")
    public Object insertUser(@RequestBody Map<String,String> userInfo) throws Exception {
        UserDTO user = new UserDTO();
        user.setId(userInfo.get("id"));
        user.setPw(userInfo.get("pw"));
        user.setName(userInfo.get("name"));
        user.setEmail(userInfo.get("email"));
        user.setGenre(userInfo.get("genres"));

        userService.insertUser(user);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");

        return result;
    }

    @PostMapping("/login")
    public Object SelectUser(@RequestBody Map<String, String> user) throws Exception {
        UserDTO userInfo = new UserDTO();

        userInfo.setId(user.get("id"));
        userInfo.setPw(user.get("pw"));

        int result = userService.isUserInfo(userInfo);


        if(result == 1){


            UserDTO userDetail = userService.selectUser(userInfo);

            return userDetail;

        }else{
            System.out.println("로그인안됨.");

            return 0;
        }

    }


}