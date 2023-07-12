import { styled } from 'styled-components';

export const Info = styled.section`
  width: 1320px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const Profile = styled.img`
  width: 150px;
  height: 150px;
`;

export const InfoCol = styled.div`
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

export const Username = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const Genres = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const Genre = styled.div`
  background-color: var(--gray);
  padding: 8px 12px;
  border-radius: 5px;
  margin-right: 10px;
  display: flex;
`;

export const Buttons = styled.div``;

export const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 8px 10px;

  color: var(--white);

  &:first-child {
    background-color: var(--purple);
    margin-right: 10px;
  }

  &:last-child {
    background-color: var(--red);
  }
`;

export const MyReviews = styled.section`
  max-width: 1320px;
  margin: 0 auto;
  margin-top: 20px;
`;

export const SectionHeader = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const ReviewList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 10px;
`;
