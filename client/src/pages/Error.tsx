import errorIcon from '../assets/errorIcon.svg';
import {
  Icon,
  Message,
  MessageLink,
  MessageRow,
  Wrapper,
} from './styles/Error.styled';

function Error() {
  return (
    <Wrapper>
      <MessageRow>
        <Icon src={errorIcon} alt="error-icon" />
        <Message>페이지가 존재하지 않습니다.</Message>
      </MessageRow>
      <MessageRow>
        <MessageLink to="/">cinema princess로 돌아가기</MessageLink>
      </MessageRow>
    </Wrapper>
  );
}

export default Error;
