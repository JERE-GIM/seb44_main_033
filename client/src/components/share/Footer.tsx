import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  BETeamContainer,
  FETeamContainer,
  FooterContainer,
  TeamName,
} from '../../styles/components/share/Footer.styled';

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
