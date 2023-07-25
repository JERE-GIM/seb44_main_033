import LoginForm from '../components/login/loginForm';
import { LoginStyle } from '../styles/pages/Login.styled';

export default function Login() {
  return (
    <LoginStyle>
      <LoginForm
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </LoginStyle>
  );
}
