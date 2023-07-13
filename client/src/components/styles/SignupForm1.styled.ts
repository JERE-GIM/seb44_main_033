import { styled } from 'styled-components';

export const Container = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 540px;
  box-sizing: border-box;
  border: 1px solid gray;
  border-radius: 10px;
`;
export const Container1page = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const LogoTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #765aaf;
  margin-top: 40px;
`;
export const SubTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
`;
export const DisplayNameBox = styled.div`
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  width: 345px;
  height: 54px;
  border-radius: 10px;
  margin-top: 20px;
`;
export const DisplayNameInput = styled.input`
  background-color: #f5f5f5;
  margin: 15px 0px 0px 10px;
  font-size: 18px;
  border: white;
  &:focus {
    outline: none;
  }
`;
export const EmailBox = styled.div`
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  width: 345px;
  height: 54px;
  border-radius: 10px;
  margin-top: 10px;
`;
export const EmailInput = styled.input`
  background-color: #f5f5f5;
  margin: 15px 0px 0px 10px;
  font-size: 18px;
  border: white;
  &:focus {
    outline: none;
  }
`;
export const PasswordBox = styled.div`
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  width: 345px;
  height: 54px;
  border-radius: 10px;
  margin-top: 10px;
`;
export const PasswordInput = styled.input`
  background-color: #f5f5f5;
  margin: 15px 0px 0px 10px;
  font-size: 18px;
  border: white;
  &:focus {
    outline: none;
  }
`;
export const SignupButton = styled.button`
  background-color: #8000ff;
  width: 100px;
  height: 40px;
  color: white;
  border: none;
  padding: 6px 16px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  margin-top: 20px;
  &:active {
    background-color: #6600cc;
  }
`;
export const LoginmessageBox = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
export const Loginmessage = styled.div`
  margin-top: 30px;
  margin-right: 10px;
`;
export const Loginlink = styled.div`
  margin-top: 30px;
  margin-right: 20px;
`;
export const OAuthbox = styled.div`
  margin-top: 20px;
`;
export const KakaoLogo = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 50px;
`;
export const NaverLogo = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
`;
export const GoogleLogo = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-left: 50px;
`;
