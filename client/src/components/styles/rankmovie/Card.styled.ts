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
  width: 220px;
  height: 300px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

export const Info = styled.div`
  text-align: left;
  width: 100%;
`;

export const Title = styled.div`
  color: #292a32;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
  margin-top: 10px;
  margin-bottom: 3px;
  white-space: nowrap;
  max-width: 200px;
`;

export const Keyword = styled.div`
  color: #292a32;
  padding-bottom: 1px;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`;
export const Average = styled.div`
  color: #74747b;
  font-size: 14px;
  font-weight: 700;
  margin-top: 2px;
  display: flex;
  span {
    display: flex;
    margin-top: 1px;
    margin-left: 5px;
  }
`;
