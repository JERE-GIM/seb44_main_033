package com.cinemaprincess.user.mapper;

import com.cinemaprincess.user.dto.UserDto;
import com.cinemaprincess.user.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-22T22:10:21+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11.0.19 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User postDtoToUser(UserDto.Post userPostDto) {
        if ( userPostDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.email( userPostDto.getEmail() );
        user.password( userPostDto.getPassword() );
        user.gender( userPostDto.getGender() );
        user.age( userPostDto.getAge() );
        user.username( userPostDto.getUsername() );
        List<String> list = userPostDto.getGenre();
        if ( list != null ) {
            user.genre( new ArrayList<String>( list ) );
        }

        return user.build();
    }

    @Override
    public User patchDtoToUser(UserDto.Patch userPatchDto) {
        if ( userPatchDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.userId( userPatchDto.getUserId() );
        user.age( userPatchDto.getAge() );
        user.username( userPatchDto.getUsername() );
        List<String> list = userPatchDto.getGenre();
        if ( list != null ) {
            user.genre( new ArrayList<String>( list ) );
        }

        return user.build();
    }

    @Override
    public User patchPasswordToUser(UserDto.PatchToPassword userPatchToPassword) {
        if ( userPatchToPassword == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.userId( userPatchToPassword.getUserId() );
        user.password( userPatchToPassword.getPassword() );

        return user.build();
    }
}
