import {
  Background,
  CloseButton,
  Controller,
  FileInput,
  FileInputLabel,
  Form,
  Modal,
  ModalHeader,
  ModalTitle,
  Profile,
  SubmitButton,
} from '../styles/ProfileUploadModal.styled';
import closeButton from '../../assets/closeButton.svg';
import { useAppDispatch } from '../../redux/store';
import { modalAction } from '../../redux/reducers/modal';
import { useState } from 'react';
import profile from '../../assets/profile.jpg';

export default function ProfileUploadModal() {
  const dispatch = useAppDispatch();
  const [imgFile, setImgFile] = useState('');

  const handleCloseModalUnsaved = () => {
    dispatch(modalAction.close());
  };

  const handleClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(imgFile);
    // api 로직 추가
    dispatch(modalAction.close());
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : '';
    if (!file) return;

    setImgFile(URL.createObjectURL(file));
  };

  return (
    <Background onClick={handleCloseModalUnsaved}>
      <Modal onClick={handleClickModal}>
        <ModalHeader>
          <ModalTitle>프로필 이미지 변경</ModalTitle>
          <CloseButton onClick={handleCloseModalUnsaved}>
            <img src={closeButton} alt="close button" />
          </CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmitForm}>
          <Profile src={imgFile ? imgFile : profile} alt="profile image" />
          <FileInputLabel htmlFor="imageUpload">
            <FileInput
              type="file"
              accept="image/*"
              id="imageUpload"
              onChange={handleChangeFile}
            />
            이미지 업로드
          </FileInputLabel>
          <Controller>
            <SubmitButton disabled={imgFile ? false : true}>확인</SubmitButton>
          </Controller>
        </Form>
      </Modal>
    </Background>
  );
}
