package com.cinemaprincess.user.mapper;

import com.cinemaprincess.user.dto.UserDto;
import com.cinemaprincess.user.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-10T09:42:04+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11.0.19 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User postDtoToUser(UserDto.Post userPostDto) {
        if ( userPostDto == null ) {
            return null;
        }

        User user = new User();

        user.setEmail( userPostDto.getEmail() );
        user.setPassword( userPostDto.getPassword() );
        user.setGender( userPostDto.getGender() );
        user.setAge( userPostDto.getAge() );
        user.setUsername( userPostDto.getUsername() );
        user.setGenre( userPostDto.getGenre() );
        user.setPreferredOtt( userPostDto.getPreferredOtt() );

        return user;
    }

    @Override
    public User patchDtoToUser(UserDto.Patch userPatchDto) {
        if ( userPatchDto == null ) {
            return null;
        }

        User user = new User();

        user.setUserId( userPatchDto.getUserId() );
        user.setEmail( userPatchDto.getEmail() );
        user.setPassword( userPatchDto.getPassword() );
        user.setAge( userPatchDto.getAge() );
        user.setUsername( userPatchDto.getUsername() );
        user.setGenre( userPatchDto.getGenre() );
        user.setPreferredOtt( userPatchDto.getPreferredOtt() );

        return user;
    }

    @Override
    public UserDto.Response userToResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.Response response = new UserDto.Response();

        response.setUserId( user.getUserId() );
        response.setEmail( user.getEmail() );
        response.setGender( user.getGender() );
        response.setAge( user.getAge() );
        response.setUsername( user.getUsername() );
        response.setCreatedAt( user.getCreatedAt() );
        response.setModifiedAt( user.getModifiedAt() );
        response.setGenre( user.getGenre() );
        response.setPreferredOtt( user.getPreferredOtt() );

        return response;
    }
}
