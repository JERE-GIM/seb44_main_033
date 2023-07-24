import { Icon, Message, Wrapper } from '../styles/Empty.styled';
import errorIcon from '../../assets/errorIcon.svg';

interface IEmptyProps {
  message: string;
}

function Empty({ message }: IEmptyProps) {
  return (
    <Wrapper>
      <Icon src={errorIcon} alt="error-icon" />
      <Message>{message}</Message>
    </Wrapper>
  );
}

export default Empty;
