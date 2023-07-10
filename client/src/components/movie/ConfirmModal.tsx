import {
  Button,
  ConfirmButtons,
  ConfirmMessage,
  Background,
  Modal,
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
    <Background onClick={handleCloseModalUnconfirmed}>
      <Modal onClick={handleClickModal}>
        <ConfirmMessage>{message}</ConfirmMessage>
        <ConfirmButtons>
          <Button onClick={handleClickConfirm}>확인</Button>
          <Button onClick={handleCloseModalUnconfirmed}>취소</Button>
        </ConfirmButtons>
      </Modal>
    </Background>
  );
}
