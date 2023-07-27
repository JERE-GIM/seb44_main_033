import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { MODAL_ROLE, modalAction } from '../redux/reducers/modal';
import LoginForm from '../components/account/loginForm';
import {
  BoxButton,
  BoxContainer,
  Boxwrapper,
  Container,
  ExplainBox,
  ExplaininBox,
  ImageinBox,
  MainText,
  Mainbox,
  Mainimg,
  SubBox,
  TitleBox,
} from '../styles/pages/Statistics.styled';

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
              <BoxButton>🔨 준비중</BoxButton>
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
