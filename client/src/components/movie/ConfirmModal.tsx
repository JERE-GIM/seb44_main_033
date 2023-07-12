import { modalAction } from '../../redux/reducers/modal';
import { useAppDispatch } from '../../redux/store';
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
}

export default function ConfirmModal({ message, callback }: IConfirmModal) {
  const dispatch = useAppDispatch();

  const handleClickConfirm = () => {
    callback();
  };

  const handleCloseModalUnconfirmed = () => {
    dispatch(modalAction.close());
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
