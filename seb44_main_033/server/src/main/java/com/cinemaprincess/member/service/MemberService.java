package com.cinemaprincess.member.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.cinemaprincess.member.entity.Member;
import com.cinemaprincess.member.repository.MemberRepository;
import com.cinemaprincess.exception.*;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository
                         ) {
        this.memberRepository = memberRepository;

    }

    // 회원가입
    public Member createMember(Member member) {
        // 중복 메일 확인
        verifyExistsEmail(member.getEmail());

        // password 암호



        return memberRepository.save(member);
    }

    // 회원정보 수정
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> findMember.setEmail(email));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(password));
        Optional.ofNullable(member.getUsername())
                .ifPresent(username -> findMember.setUsername(username));


        return memberRepository.save(findMember);
    }

    // 회원 조회
    public Member findMember(Long memberId) {
        return findVerifiedMember(memberId);
    }

    // 회원 탈퇴
    public void deleteMember(Long memberId) {
        Member member = findVerifiedMember(memberId);

        memberRepository.deleteById(memberId);
    }

    // 중복된 이메일인지 확인
    private void verifyExistsEmail(String email) {
        Optional<Member> optional = memberRepository.findByEmail(email);
        if (optional.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.USER_EMAIL_EXISTS);
        }

    }

    // 존재하는 회원인지 확인
    private Member findVerifiedMember(Long memberId) {
        Optional<Member> optional = memberRepository.findById(memberId);
        Member findMember = optional
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return findMember;
    }
}
