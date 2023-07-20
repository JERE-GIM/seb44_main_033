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
  ReviewList,
  SectionHeader,
  Username,
} from './styles/Mypage.styled';
import profile from '../assets/profile.jpg';
import ReviewListitem from '../components/movie/ReviewListitem';
import { dummyUser } from '../dummy/dummyUser';
import { dummyReviews } from '../dummy/dummyReview';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { MODAL_ROLE, modalAction } from '../redux/reducers/modal';
import ConfirmModal from '../components/movie/ConfirmModal';
import UserInfoEditModal from '../components/mypage/UserInfoEditModal';
import ProfileUploadModal from '../components/mypage/ProfileUploadModal';

export default function Mypage() {
  const user = dummyUser;
  const dispatch = useAppDispatch();
  const { modal: openModal } = useAppSelector((state) => state);

  const deleteMyAccount = () => {
    console.log('회원 탈퇴');
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

  return (
    <>
      <Info>
        <ProfileContainer>
          <Profile src={profile} alt="profile image" />
          <ProfileEditButton onClick={handleClickUploadProfile}>
            변경
          </ProfileEditButton>
        </ProfileContainer>
        <InfoCol>
          <Username>{user.username}</Username>
          <Genres>
            {user.genres.map((genre) => (
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
        <ReviewList>
          {dummyReviews.map((review) => (
            <ReviewListitem key={review.reviewId} review={review} />
          ))}
        </ReviewList>
      </MyReviews>
      {openModal.status && openModal.role === MODAL_ROLE.USER_INFO_EDIT && (
        <UserInfoEditModal user={user} />
      )}
      {openModal.status && openModal.role === MODAL_ROLE.ACCOUNT_DELETE && (
        <ConfirmModal
          message="Cinema Princess에서 탈퇴하시겠습니까?"
          callback={deleteMyAccount}
        />
      )}
      {openModal.status && openModal.role === MODAL_ROLE.PROFILE_UPLOAD && (
        <ProfileUploadModal />
      )}
    </>
  );
}
