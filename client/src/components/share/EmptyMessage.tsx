import {
  Icon,
  Message,
  Wrapper,
} from '../../styles/components/share/Empty.styled';
import errorIcon from '../../assets/errorIcon.svg';

interface IEmptyMessageProps {
  message: string;
}

function EmptyMessage({ message }: IEmptyMessageProps) {
  return (
    <Wrapper>
      <Icon src={errorIcon} alt="error-icon" />
      <Message>{message}</Message>
    </Wrapper>
  );
}

export default EmptyMessage;
