import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
export const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  line-height: 30px;
  padding: 20px;
`;

export const CategoryMenuBox = styled.div`
  background-color: #f5f5f5;
`;

export const CategoryMenu = styled.div`
  font-weight: 700;
  font-size: 20px;
  display: flex;
  gap: 10px;
  cursor: pointer;
  padding: 20px;
  width: 130px;
  height: 50px;
`;
export const DropDownBoxWrap = styled.div`
  height: 130px;
  display: inline-block;
  width: 130px;
`;

export const DropDownContainer = styled.ul`
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  list-style: none;
`;
export const ListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
  list-style: none;
  padding: 10px;
  margin-top: 2px;
  margin-left: 25px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MovieItem = styled(Link)`
  width: 25%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  > p {
    margin-top: 2px;
  }
`;

export const MovieImage = styled.img`
  width: 200px;
  margin-bottom: 10px;
`;
