package com.bitc.laf.laftelbackend.service;


import com.bitc.laf.laftelbackend.dto.UserDTO;
import com.bitc.laf.laftelbackend.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

private final UserMapper userMapper;
    @Override
    public void insertUser(UserDTO user) throws Exception {
        userMapper.insertUser(user);
    }

    @Override
    public int userCheck(String id) throws Exception {
        return userMapper.userCheck(id);
    }


    @Override
    public int isUserInfo(UserDTO userInfo) throws Exception {
        return userMapper.isUserInfo(userInfo);
    }

    @Override
    public UserDTO selectUser(UserDTO userInfo) throws Exception {
        return userMapper.selectUser(userInfo);
    }
}
