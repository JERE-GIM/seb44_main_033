import {
  Button,
  Buttons,
  Genre,
  Genres,
  Info,
  InfoCol,
  Profile,
  Username,
} from './styles/Mypage.styled';
import profile from '../assets/profile.jpg';
import { dummyUser } from '../dummy/dummyUser';

export default function Mypage() {
  const user = dummyUser;

  return (
    <Info>
      <Profile src={profile} alt="profile image" />
      <InfoCol>
        <Username>{user.username}</Username>
        <Genres>
          {user.genres.map((genre) => (
            <Genre key={genre}>{genre}</Genre>
          ))}
        </Genres>
        <Buttons>
          <Button>회원정보 수정</Button>
          <Button>회원 탈퇴</Button>
        </Buttons>
      </InfoCol>
    </Info>
  );
}
