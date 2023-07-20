import { MODAL_ROLE, modalAction } from '../../redux/reducers/modal';
import { useAppDispatch } from '../../redux/store';
import { IReview } from '../../types/movie';
import {
  MyReviewButtons,
  MyReviewContainer,
  MyReviewContent,
  MyReviewControlButton,
  MyReviewRegisterButton,
  MyReviewWrapper,
} from '../styles/MyReview.styled';

interface IMyReviewProps {
  myReview: IReview | null;
  handleOpenReviewModal: () => void;
}

function MyReview({ myReview, handleOpenReviewModal }: IMyReviewProps) {
  const dispatch = useAppDispatch();

  const handleOpenConfirmModal = () => {
    dispatch(modalAction.open(MODAL_ROLE.REVIEW_DELETE));
  };

  return (
    <MyReviewWrapper>
      {myReview ? (
        <MyReviewContainer>
          <MyReviewContent>{myReview.content}</MyReviewContent>
          <MyReviewButtons>
            <MyReviewControlButton onClick={handleOpenReviewModal}>
              수정
            </MyReviewControlButton>
            <MyReviewControlButton onClick={handleOpenConfirmModal}>
              삭제
            </MyReviewControlButton>
          </MyReviewButtons>
        </MyReviewContainer>
      ) : (
        <MyReviewContainer>
          <MyReviewContent>영화를 보고 난 소감을 기록하세요.</MyReviewContent>
          <MyReviewRegisterButton onClick={handleOpenReviewModal}>
            리뷰 작성하기
          </MyReviewRegisterButton>
        </MyReviewContainer>
      )}
    </MyReviewWrapper>
  );
}

export default MyReview;
