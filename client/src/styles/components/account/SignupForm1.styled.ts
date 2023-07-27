import { styled } from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 540px;
  box-sizing: border-box;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 2px 2px;
  z-index: 9999;
`;
export const ModalBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.8);
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
export const UserNameBox = styled.div`
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  width: 345px;
  height: 54px;
  border-radius: 10px;
  margin-top: 20px;
`;
export const UserNameInput = styled.input`
  background-color: #f5f5f5;
  margin: 15px 0px 0px 10px;
  font-size: 18px;
  border: white;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 14px;
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
  &::placeholder {
    font-size: 16px;
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
  width: 340px;
  border: white;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 14px;
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
  color: #939393;
`;
export const Loginlink = styled.div`
  margin-top: 30px;
  margin-right: 20px;
  color: #9933ff;
  cursor: pointer;
`;
export const OAuthbox = styled.div`
  margin-top: 20px;
`;
export const KakaoLogo = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 50px;
  cursor: pointer;
`;
export const NaverLogo = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
`;
export const GoogleLogo = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-left: 50px;
  cursor: pointer;
`;
//2페이지
export const Container2page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const UserInfoTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #765aaf;
  margin-top: 40px;
`;
export const GenderBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 345px;
`;

export const GenderTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 50px;
`;

export const GenderBoxLabel = styled.label`
  display: flex;
  align-items: center;
  width: 90px;
`;

export const GenderText = styled.span<{ selected: boolean }>`
  font-size: 16px;
  width: 65px;
  height: 30px;
  background: ${({ selected }) => (selected ? '#b366ff' : 'lightgray')};
  border-radius: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ selected }) => (selected ? 'white' : 'black')};

  &:hover {
    background: #b366ff;
    color: white;
  }
`;

export const GenderInput = styled.input`
  display: none;

  &:checked + ${GenderText} {
    background: #765aaf;
    color: #fff;
  }
`;

export const AgeBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 345px;
`;

export const AgeTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 50px;
`;

export const AgeBoxLabel = styled.label`
  display: flex;
  align-items: center;
  width: 90px;
`;

export const AgeText = styled.span<{ selected: boolean }>`
  font-size: 16px;
  width: 65px;
  height: 30px;
  background: ${({ selected }) => (selected ? '#b366ff' : 'lightgray')};
  border-radius: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ selected }) => (selected ? 'white' : 'black')};

  &:hover {
    background: #b366ff;
    color: white;
  }
`;

export const AgeInput = styled.input`
  display: none;

  &:checked + ${AgeText} {
    background: #765aaf;
    color: #fff;
  }
`;
export const AgeTitlebottom = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 57px;
  margin-right: 50px;
`;

export const GenreBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 345px;
`;

export const GenreTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;
`;

export const GenreBoxLabel = styled.label`
  display: flex;
  align-items: center;
  width: 90px;
  margin-right: -20px;
`;

export const GenreText = styled.span<{ selected: boolean }>`
  font-size: 14px;
  width: 65px;
  height: 30px;
  background: ${({ selected }) => (selected ? '#b366ff' : 'lightgray')};
  border-radius: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${({ selected }) => (selected ? 'white' : 'black')};

  &:hover {
    background: #b366ff;
    color: white;
  }
`;
export const GenreInput = styled.input`
  display: none;

  &:checked + ${AgeText} {
    background: #765aaf;
    color: #fff;
  }
`;
export const GenreTitlebottom = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 57px;
  margin-right: 50px;
`;
export const MessageBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0px;
`;
export const Alertmessage = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-top: 20px;
  color: #9933ff;
`;
export const SignupButton2 = styled.button`
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
  margin: 20px 20px 0px 20px;
  &:active {
    background-color: #6600cc;
  }
`;
