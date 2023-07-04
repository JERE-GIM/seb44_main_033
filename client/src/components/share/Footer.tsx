import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFigma } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const FooterContainer = styled.footer`
  background-color: #1a0033;
  color: white;
  font-size: 30px;
  height: 100px;
  padding: 20px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Icon = styled(FontAwesomeIcon)`
  margin: 10px 20px;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <IconContainer>
        <Icon icon={faGoogle} />
        <Icon icon={faFacebook} />
        <Icon icon={faGithub} />
        <Icon icon={faFigma} />
      </IconContainer>
    </FooterContainer>
  );
};

export default Footer;
