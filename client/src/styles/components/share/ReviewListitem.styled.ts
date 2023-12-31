import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import ReviewStars from '../../../components/share/ReviewStars';

export const Wrapper = styled.li`
  padding: 20px;
  background-color: var(--gray-light);
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const ReviewTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ReviewMiddle = styled.div`
  margin-bottom: 10px;
`;

export const ReviewBottom = styled.div``;

export const Image = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 5px;
`;

export const Username = styled.div`
  font-weight: 600;
`;

export const MovieTitle = styled(Link)`
  font-weight: 600;
`;

export const Stars = styled(ReviewStars)``;

export const Comment = styled.p`
  height: 120px;
  line-height: 20px;
  margin-top: 10px;
  overflow: scroll;
`;

export const LikeButton = styled.button<{ $liked: boolean; disabled: boolean }>`
  padding: 8px 15px;
  display: flex;
  align-items: center;
  border: 1px solid var(--gray);
  border-radius: 20px;
  background-color: ${({ $liked, disabled }) =>
    disabled ? '#e0e0e0' : $liked ? 'var(--purple)' : 'var(--white)'};
  ${({ disabled }) => disabled && 'cursor:auto'}
`;

export const IconImage = styled.img<{ $liked: boolean }>`
  filter: ${(props) =>
    props.$liked
      ? 'invert(100%) sepia(0%) saturate(7499%) hue-rotate(287deg) brightness(103%) contrast(101%)'
      : 'invert(0%) sepia(5%) saturate(20%) hue-rotate(265deg) brightness(106%) contrast(98%)'};
`;

export const ButtonText = styled.span<{ $liked: boolean }>`
  margin-left: 5px;
  font-size: 15px;
  color: ${(props) => (props.$liked ? 'var(--white)' : 'var(--black)')};
`;
