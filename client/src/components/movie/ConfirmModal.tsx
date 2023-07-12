import {
  StyledButton,
  StyledConfirmButtons,
  StyledConfirmMessage,
  StyledBackground,
  StyledModal,
} from '../styles/ConfirmModal.styled';

interface IConfirmModal {
  message: string;
  callback: () => void;
  setIsOpenConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmModal({
  message,
  callback,
  setIsOpenConfirmModal,
}: IConfirmModal) {
  const handleClickConfirm = () => {
    callback();
    setIsOpenConfirmModal(false);
  };

  const handleCloseModalUnconfirmed = () => {
    setIsOpenConfirmModal(false);
  };

  const handleClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <StyledBackground onClick={handleCloseModalUnconfirmed}>
      <StyledModal onClick={handleClickModal}>
        <StyledConfirmMessage>{message}</StyledConfirmMessage>
        <StyledConfirmButtons>
          <StyledButton onClick={handleClickConfirm}>확인</StyledButton>
          <StyledButton onClick={handleCloseModalUnconfirmed}>
            취소
          </StyledButton>
        </StyledConfirmButtons>
      </StyledModal>
    </StyledBackground>
  );
}
