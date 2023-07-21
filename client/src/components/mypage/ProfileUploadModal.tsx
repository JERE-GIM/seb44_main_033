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
import { useEffect, useState } from 'react';
import profile from '../../assets/profile.jpg';
import { requestUpdateProfile } from '../../api/userInfo';

interface IProfileUploadModalProps {
  callback: () => void;
}

export default function ProfileUploadModal({
  callback,
}: IProfileUploadModalProps) {
  const dispatch = useAppDispatch();
  const [imgPreview, setImgPreview] = useState('');
  const [imgFile, setImgFile] = useState<File | null>(null); //FormData로 전송하기 위함

  const handleCloseModalUnsaved = () => {
    dispatch(modalAction.close());
  };

  const handleClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (imgFile) formData.append('imgFile', imgFile);

    requestUpdateProfile(formData).then(() => {
      callback();
      dispatch(modalAction.close());
    });
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : '';
    if (!file) return;

    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (imgPreview) {
      return () => URL.revokeObjectURL(imgPreview);
    }
  }, [imgPreview]);

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
          <Profile
            src={imgPreview ? imgPreview : profile}
            alt="profile image"
          />
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
