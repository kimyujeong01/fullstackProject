package com.bitc.laf.laftelbackend.mapper;


import com.bitc.laf.laftelbackend.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    void insertUser(UserDTO user) throws Exception;

    int userCheck(String id) throws Exception;
    int isUserInfo(UserDTO userInfo)throws Exception;

    UserDTO selectUser(UserDTO userInfo)throws Exception;
}
