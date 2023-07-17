import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
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
  height: 600px;
  margin-top: 40px;
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
              <FontAwesomeIcon icon={faBookmark} size="9x" color="#2f88ff" />
            </ImageinBox>
            <ExplainBox>
              <TitleBox>Best 찜한 영화</TitleBox>
              <ExplaininBox>
                일간, 주간, 월간 조건으로, Cinema Princess 사용자 여러분이 찜한
                영화의 평점 및 담긴 횟수, 순위를 조회할 수 있습니다.
              </ExplaininBox>
              <BoxButton>자세히 보기 </BoxButton>
            </ExplainBox>
          </BoxContainer>
          <BoxContainer>
            <ImageinBox>
              <FontAwesomeIcon icon={faMessage} size="9x" color="#2f88ff" />
            </ImageinBox>
            <ExplainBox>
              <TitleBox>Best 리뷰 영화</TitleBox>
              <ExplaininBox>
                일간, 주간, 월간 조건으로, Cinema Princess 사용자 여러분이
                리뷰를 남겨주신 영화의 리뷰 수와 순위를 조회할 수 있습니다.
              </ExplaininBox>
              <BoxButton>자세히 보기</BoxButton>
            </ExplainBox>
          </BoxContainer>
        </Boxwrapper>
        <Boxwrapper>
          <BoxContainer>
            <ImageinBox>
              <FontAwesomeIcon icon={faHeart} size="9x" color="#2f88ff" />
            </ImageinBox>
            <ExplainBox>
              <TitleBox>회원 유형별 선호 장르</TitleBox>
              <ExplaininBox>
                성별, 나이를 기준으로, Cinema Princess 사용자 여러분이 선호하는
                영화의 장르와 순위를 조회할 수 있습니다.
              </ExplaininBox>
              <BoxButton>자세히 보기 </BoxButton>
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
              <BoxButton>자세히 보기 </BoxButton>
            </ExplainBox>
          </BoxContainer>
        </Boxwrapper>
      </SubBox>
    </Container>
  );
}
