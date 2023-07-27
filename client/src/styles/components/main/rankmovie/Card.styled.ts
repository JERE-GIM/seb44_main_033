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
  margin-left: 10px;
`;

export const Info = styled.div`
  text-align: left;
  width: 100%;
  margin-left: 10px;
`;

export const Title = styled.div`
  color: #292a32;
  font-size: 18px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
  margin-top: 13px;
  margin-bottom: 4px;
  white-space: nowrap;
  max-width: 200px;
`;

export const Keyword = styled.div`
  color: #292a32;
  padding-bottom: 1px;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
`;
export const Ranking = styled.div`
  position: absolute;
  top: 7px;
  left: 30px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 4px;
  z-index: 1;
`;
