import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const FooterContainer = styled.footer`
  background-color: #1a0033;
  color: white;
  font-size: 30px;
  height: 100px;
  width: 100vw;
  padding: 20px;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
`;

const BETeamContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 16px;
`;
const FETeamContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-left: -62px;
  font-size: 16px;
`;
const TeamName = styled.div`
  margin-left: 20px;
  font-size: 16px;
  color: #f7f7f7;
`;
const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <BETeamContainer>
        Backend |
        <Link to="https://github.com/SuHyeonEo">
          <TeamName>
            <FontAwesomeIcon icon={faStar} color="yellow" />
            어수현
          </TeamName>
        </Link>
        <Link to="https://github.com/haruday97">
          <TeamName>이하루</TeamName>
        </Link>
        <Link to="https://github.com/JERE-GIM">
          <TeamName>안형준</TeamName>
        </Link>
        <Link to="https://github.com/KimHyu1">
          <TeamName>김 휴</TeamName>
        </Link>
      </BETeamContainer>
      <FETeamContainer>
        Frontend |
        <Link to="https://github.com/hahagarden">
          <TeamName>
            <FontAwesomeIcon icon={faStar} size="1x" color="yellow" />
            이정원
          </TeamName>
        </Link>
        <Link to="https://github.com/jonghyeon37">
          <TeamName>김종현</TeamName>
        </Link>
        <Link to="https://github.com/hyeong-il">
          <TeamName>김형일</TeamName>
        </Link>
      </FETeamContainer>
    </FooterContainer>
  );
};

export default Footer;
