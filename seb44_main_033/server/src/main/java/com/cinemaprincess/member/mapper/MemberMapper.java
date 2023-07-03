package com.cinemaprincess.member.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.cinemaprincess.member.dto.MemberDto;
import com.cinemaprincess.member.entity.Member;
import com.server.Response.Response;


@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member postDtoToMember(MemberDto.Post memberPostDto);

    Member patchDtoToMember(MemberDto.Patch memberPatchDto);

    Response memberToResponse(Member member);

}
