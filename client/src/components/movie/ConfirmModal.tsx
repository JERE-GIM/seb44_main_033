import { useState } from 'react';
import { useMatch } from 'react-router-dom';

import { modalAction } from '../../redux/reducers/modal';
import { useAppDispatch } from '../../redux/store';
import {
  Button,
  ConfirmButtons,
  ConfirmMessage,
  Background,
  Modal,
  ConfirmCheckbox,
  ConfirmCheckboxText,
  ConfirmCheckboxInput,
} from '../styles/ConfirmModal.styled';

interface IConfirmModal {
  message: string;
  callback: () => void;
}

export default function ConfirmModal({ message, callback }: IConfirmModal) {
  const dispatch = useAppDispatch();
  const isMypage = useMatch('/mypage');
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckbox = ({
    target: { checked },
  }: {
    target: { checked: boolean };
  }) => {
    setChecked(checked);
  };

  const handleClickConfirm = () => {
    if (isMypage && !checked) return;
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
        {isMypage && (
          <ConfirmCheckbox>
            <ConfirmCheckboxText>회원 탈퇴에 동의합니다.</ConfirmCheckboxText>
            <ConfirmCheckboxInput
              type="checkbox"
              checked={checked}
              onChange={handleCheckbox}
            />
          </ConfirmCheckbox>
        )}
        <ConfirmButtons>
          <Button onClick={handleClickConfirm}>확인</Button>
          <Button onClick={handleCloseModalUnconfirmed}>취소</Button>
        </ConfirmButtons>
      </Modal>
    </Background>
  );
}
