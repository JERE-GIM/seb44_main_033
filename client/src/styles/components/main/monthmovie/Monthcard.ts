import { styled } from 'styled-components';

export const Container = styled.div`
  text-decoration: none;
  display: block;
  margin-inline: 10px;
`;

export const Base = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const ImageWrapper = styled.div`
  width: 200px;
  height: 300px;
  margin-left: 50px;
  margin-top: 3px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;
