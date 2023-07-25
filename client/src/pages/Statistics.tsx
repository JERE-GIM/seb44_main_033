import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { MODAL_ROLE, modalAction } from '../redux/reducers/modal';
import LoginForm from '../components/login/loginForm';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Mainbox = styled.div`
  width: 100vw;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Mainimg = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const MainText = styled.div`
  width: 300px;
  height: 50px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
`;
export const SubBox = styled.div`
  width: 100vw;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Boxwrapper = styled.div`
  display: flex;
`;
export const BoxContainer = styled.div`
  width: 520px;
  height: 260px;
  margin: 10px 10px;
  display: flex;
  align-items: center;
  border: 1px solid #939393;
  border-radius: 10px;
`;
export const ImageinBox = styled.div`
  width: 180px;
  height: 200px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const ExplainBox = styled.div`
  width: 280px;
  height: 260px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const TitleBox = styled.div`
  width: 240px;
  height: 50px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
`;
export const ExplaininBox = styled.div`
  width: 240px;
  height: 120px;
  margin-top: 10px;
`;
export const BoxButton = styled.button`
  width: 120px;
  height: 50px;
  border: 1px solid;
  border-radius: 10px;
  font-size: 20px;
  color: white;
  background-color: #8000ff;
  &:active {
    background-color: #6600cc;
  }
`;
export default function Statistics() {
  const { isLogin, modal } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const blockUnloggedInUser = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLogin.status) {
      event.preventDefault();
      return dispatch(modalAction.open(MODAL_ROLE.LOGIN));
    }
  };

  return (
    <Container>
      <Mainbox>
        <Mainimg>
          <FontAwesomeIcon icon={faChartPie} size="10x" />
        </Mainimg>
        <MainText>사이트 정보 &middot; 통계</MainText>
      </Mainbox>
      <SubBox>
        <Boxwrapper>
          <BoxContainer>
            <ImageinBox>
              <FontAwesomeIcon icon={faHeart} size="9x" color="#2f88ff" />
            </ImageinBox>
            <ExplainBox>
              <TitleBox>회원 유형별 선호장르</TitleBox>
              <ExplaininBox>
                성별, 나이를 기준으로, Cinema Princess 사용자 여러분이 선호하는
                영화의 장르와 순위를 조회할 수 있습니다.
              </ExplaininBox>
              {/* <Link to="/statistics/users" onClick={blockUnloggedInUser}> */}
              <BoxButton>🔨준비중</BoxButton>
              {/* </Link> */}
            </ExplainBox>
          </BoxContainer>
          <BoxContainer>
            <ImageinBox>
              <FontAwesomeIcon
                icon={faCalendarDays}
                size="9x"
                color="#2f88ff"
              />
            </ImageinBox>
            <ExplainBox>
              <TitleBox>연도별 장르 통계</TitleBox>
              <ExplaininBox>
                연도 별로, Cinema Princess에서 확인할 수 있는 영화의 장르
                트렌드를 확인할 수 있습니다.
              </ExplaininBox>
              <Link to="/statistics/genre" onClick={blockUnloggedInUser}>
                <BoxButton>자세히 보기</BoxButton>
              </Link>
            </ExplainBox>
          </BoxContainer>
        </Boxwrapper>
      </SubBox>
      {modal.status && modal.role === MODAL_ROLE.LOGIN && (
        <LoginForm
          onClose={() => {
            dispatch(modalAction.close());
          }}
        />
      )}
    </Container>
  );
}
