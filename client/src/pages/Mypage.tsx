import {
  Button,
  Buttons,
  Genre,
  Genres,
  Info,
  InfoCol,
  MyReviews,
  Profile,
  ProfileContainer,
  ProfileEditButton,
  SectionHeader,
  Username,
} from './styles/Mypage.styled';
import profile from '../assets/profile.jpg';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { MODAL_ROLE, modalAction } from '../redux/reducers/modal';
import ConfirmModal from '../components/movie/ConfirmModal';
import UserInfoEditModal from '../components/mypage/UserInfoEditModal';
import ProfileUploadModal from '../components/mypage/ProfileUploadModal';
import { useEffect, useState } from 'react';
import { requestGetUserInfo } from '../api/userInfo';
import { requestDeleteAccount } from '../api/auth';
import { IMypageResponse } from '../types/user';
import ReviewList from '../components/share/ReviewList';
import { logout } from '../redux/reducers/isLogin';
import { useNavigate } from 'react-router-dom';

export default function Mypage() {
  const [userInfo, setUserInfo] = useState<IMypageResponse>();
  const { modal } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteAccount = () => {
    requestDeleteAccount().then(() => {
      dispatch(modalAction.close());
      dispatch(logout());
      navigate('/');
    });
  };

  const handleClickEditUserInfo = () => {
    dispatch(modalAction.open(MODAL_ROLE.USER_INFO_EDIT));
  };

  const handleClickDeleteAccount = () => {
    dispatch(modalAction.open(MODAL_ROLE.ACCOUNT_DELETE));
  };

  const handleClickUploadProfile = () => {
    dispatch(modalAction.open(MODAL_ROLE.PROFILE_UPLOAD));
  };

  const fetchMyPageData = () => {
    requestGetUserInfo().then((res) => {
      setUserInfo({ ...res.data });
    });
  };

  useEffect(() => {
    fetchMyPageData();
  }, []);

  return (
    <>
      {userInfo && (
        <>
          <Info>
            <ProfileContainer>
              <Profile src={profile} alt="profile image" />
              <ProfileEditButton onClick={handleClickUploadProfile}>
                변경
              </ProfileEditButton>
            </ProfileContainer>
            <InfoCol>
              <Username>{userInfo.data.username}</Username>
              <Genres>
                {userInfo.data.genre.map((genre) => (
                  <Genre key={genre}>{genre}</Genre>
                ))}
              </Genres>
              <Buttons>
                <Button onClick={handleClickEditUserInfo}>회원정보 수정</Button>
                <Button onClick={handleClickDeleteAccount}>회원 탈퇴</Button>
              </Buttons>
            </InfoCol>
          </Info>
          <MyReviews>
            <SectionHeader>나의 리뷰</SectionHeader>
            <ReviewList reviewList={userInfo.reviews} />
          </MyReviews>
          {modal.status && modal.role === MODAL_ROLE.USER_INFO_EDIT && (
            <UserInfoEditModal
              user={userInfo.data}
              callback={fetchMyPageData}
            />
          )}
          {modal.status && modal.role === MODAL_ROLE.ACCOUNT_DELETE && (
            <ConfirmModal
              message="Cinema Princess에서 탈퇴하시겠습니까?"
              callback={deleteAccount}
            />
          )}
          {modal.status && modal.role === MODAL_ROLE.PROFILE_UPLOAD && (
            <ProfileUploadModal />
          )}
        </>
      )}
    </>
  );
}
