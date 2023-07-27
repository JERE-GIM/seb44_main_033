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
} from '../styles/pages/Mypage.styled';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { MODAL_ROLE, modalAction } from '../redux/reducers/modal';
import ConfirmModal from '../components/share/ConfirmModal';
import UserInfoEditModal from '../components/mypage/UserInfoEditModal';
import ProfileUploadModal from '../components/mypage/ProfileUploadModal';
import { useEffect, useState } from 'react';
import { fetchGetProfileImage, fetchGetUserInfo } from '../api/userInfo';
import { fetchDeleteAccount } from '../api/auth';
import { IMypageResponse } from '../types/user';
import ReviewList from '../components/share/ReviewList';
import { logout } from '../redux/reducers/isLogin';
import { useNavigate } from 'react-router-dom';
import EmptyMessage from '../components/share/EmptyMessage';

export default function Mypage() {
  const [userInfo, setUserInfo] = useState<IMypageResponse>();
  const [profileImage, setProfileImage] = useState('');
  const { modal } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFetchDeleteAccount = () => {
    fetchDeleteAccount()
      .then(() => {
        dispatch(modalAction.close());
        dispatch(logout());
        localStorage.removeItem('isLogin');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const handleFetchUserInfo = () => {
    fetchGetUserInfo()
      .then((res) => {
        setUserInfo({ ...res.data });
      })
      .catch((err) => console.log(err));
  };

  const handleFetchProfileImage = () => {
    fetchGetProfileImage()
      .then((imageBlob) => {
        const imageUrl = URL.createObjectURL(imageBlob);
        setProfileImage(imageUrl);
      })
      .catch((err) => console.log(err));
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

  useEffect(() => {
    handleFetchUserInfo();
    handleFetchProfileImage();

    return () => URL.revokeObjectURL(profileImage);
  }, []);

  return (
    <>
      {userInfo && (
        <>
          <Info>
            <ProfileContainer>
              <Profile src={profileImage} alt="profile image" />
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
            {userInfo.reviews.length === 0 ? (
              <EmptyMessage message="남긴 리뷰가 없습니다. 인상깊은 영화에 리뷰를 남겨보세요!" />
            ) : (
              <ReviewList reviewList={userInfo.reviews} hasMovieTitle={true} />
            )}
          </MyReviews>
          {modal.status && modal.role === MODAL_ROLE.USER_INFO_EDIT && (
            <UserInfoEditModal
              user={userInfo.data}
              callback={handleFetchUserInfo}
            />
          )}
          {modal.status && modal.role === MODAL_ROLE.ACCOUNT_DELETE && (
            <ConfirmModal
              message="Cinema Princess에서 탈퇴하시겠습니까?"
              callback={handleFetchDeleteAccount}
            />
          )}
          {modal.status && modal.role === MODAL_ROLE.PROFILE_UPLOAD && (
            <ProfileUploadModal
              currentProfileImage={profileImage}
              callback={handleFetchProfileImage}
            />
          )}
        </>
      )}
    </>
  );
}
