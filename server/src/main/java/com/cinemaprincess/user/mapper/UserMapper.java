package com.cinemaprincess.user.mapper;

import org.mapstruct.Mapper;

import com.cinemaprincess.user.dto.UserDto;
import com.cinemaprincess.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User postDtoToUser(UserDto.Post userPostDto);

    User patchDtoToUser(UserDto.Patch userPatchDto);

    User patchPasswordToUser(UserDto.PatchToPassword userPatchToPassword);

    UserDto.Response userToResponse(User user);
}
