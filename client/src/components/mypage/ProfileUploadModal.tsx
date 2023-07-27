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
} from '../../styles/components/mypage/ProfileUploadModal.styled';
import closeButton from '../../assets/closeButton.svg';
import { useAppDispatch } from '../../redux/store';
import { modalAction } from '../../redux/reducers/modal';
import { useEffect, useState } from 'react';
import { fetchUpdateProfileImage } from '../../api/userInfo';

interface IProfileUploadModalProps {
  currentProfileImage: string;
  callback: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ProfileUploadModal({
  currentProfileImage,
  callback,
}: IProfileUploadModalProps) {
  const dispatch = useAppDispatch();
  const [imgPreview, setImgPreview] = useState('');
  const [imgFile, setImgFile] = useState<File | null>(null); //FormData로 전송하기 위함

  const handleFetchUpdateProfile = (data: FormData) => {
    fetchUpdateProfileImage(data)
      .then(() => {
        callback();
        dispatch(modalAction.close());
      })
      .catch((err) => console.log(err));
  };

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

    handleFetchUpdateProfile(formData);
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : '';
    if (!file) return;
    if (file.size > MAX_FILE_SIZE)
      return alert('파일 사이즈는 5MB 이하로 업로드 가능합니다.');

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
            src={imgPreview ? imgPreview : currentProfileImage}
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
