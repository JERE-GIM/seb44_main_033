import { styled } from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%; /* 창의 상단을 화면의 중앙에 위치시킴 */
  left: 50%; /* 창의 왼쪽을 화면의 중앙에 위치시킴 */
  transform: translate(
    -50%,
    -50%
  ); /* 창을 수평 및 수직으로 정확히 중앙에 위치시킴 */
  /* 모달 창의 크기, 배경색, 그림자 등의 스타일을 추가로 설정할 수 있습니다. */
  z-index: 1000; /* 모달 창의 z-index 설정 */
`;
export const ModalBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  dlsplay: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0, 0.8);
  z-index: 999; /* 모달 배경의 z-index 설정 */
`;
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
  margin-right: 27px;
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
