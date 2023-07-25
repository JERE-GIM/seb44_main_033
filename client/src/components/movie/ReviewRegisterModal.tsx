import { useState } from 'react';
import { IReview } from '../../types/movie';
import Rating from '../share/Rating';
import {
  Background,
  CloseButton,
  CommentTextarea,
  Controller,
  Form,
  ModalHeader,
  Modal,
  MovieTitle,
  SubmitButton,
  InvalidMessage,
  TextLength,
} from '../styles/ReviewRegisterModal.styled';
import closeButton from '../../assets/closeButton.svg';
import { useAppDispatch } from '../../redux/store';
import { modalAction } from '../../redux/reducers/modal';
import { fetchCreateMyReview, fetchUpdateMyReview } from '../../api/movie';

interface IReviewRegister {
  movieTitle: string;
  movieId: number;
  myReview: IReview | null;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  callback: () => void;
}

const MAX_CONTENT_LENGTH = 500;

export default function ReviewRegister({
  movieTitle,
  movieId,
  myReview,
  rating,
  setRating,
  callback,
}: IReviewRegister) {
  const [content, setContent] = useState(myReview?.content || '');
  const [invalidMessage, setInvalidMessage] = useState('');
  const dispatch = useAppDispatch();

  const handleFetchUpdateMyReview = (reviewId: number) => {
    fetchUpdateMyReview(reviewId, {
      content,
      score: rating,
    }).then(() => {
      dispatch(modalAction.close());
      callback();
    });
  };

  const handleFetchCreateMyReview = () => {
    fetchCreateMyReview({
      content,
      score: rating,
      movieId,
    }).then(() => {
      dispatch(modalAction.close());
      callback();
    });
  };

  const handleCloseModalUnsaved = () => {
    if (myReview) setRating(myReview.score);
    else setRating(0);
    dispatch(modalAction.close());
  };

  const handleClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content) return setInvalidMessage('리뷰를 작성해주세요');
    if (content.length >= MAX_CONTENT_LENGTH)
      return setInvalidMessage('500자 이내로 작성해주세요');
    if (myReview) handleFetchUpdateMyReview(myReview.reviewId);
    else handleFetchCreateMyReview();
  };

  const handleChangeTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => setContent(event.target.value);

  const handleFocusTextarea = () => setInvalidMessage('');

  return (
    <>
      <Background onClick={handleCloseModalUnsaved}>
        <Modal onClick={handleClickModal}>
          <ModalHeader>
            <MovieTitle>{movieTitle}</MovieTitle>
            <CloseButton onClick={handleCloseModalUnsaved}>
              <img src={closeButton} alt="close button" />
            </CloseButton>
          </ModalHeader>
          <Form onSubmit={handleSubmitForm}>
            <Rating rating={rating} setRating={setRating} />
            <CommentTextarea
              placeholder="이 영화 어떠셨나요?"
              value={content}
              onChange={handleChangeTextarea}
              onFocus={handleFocusTextarea}
            />
            <Controller>
              <TextLength>{`${content.length}/500`}</TextLength>
              <InvalidMessage>{invalidMessage}</InvalidMessage>
              <SubmitButton>저장</SubmitButton>
            </Controller>
          </Form>
        </Modal>
      </Background>
    </>
  );
}
