package com.bitc.laf.laftelbackend.service;

import com.bitc.laf.laftelbackend.dto.UserDTO;

import java.util.List;

public interface UserService {

    void insertUser(UserDTO user) throws Exception;

    int userCheck(String id) throws Exception;
    int isUserInfo(UserDTO userInfo)throws Exception;

    UserDTO selectUser(UserDTO userInfo)throws Exception;
}
