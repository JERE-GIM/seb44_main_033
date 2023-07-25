import SignupForm1 from '../components/signup/SignupForm1';
import { SignupStyle } from '../styles/pages/Signup.styled';

export default function Signup() {
  return (
    <SignupStyle>
      <SignupForm1
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </SignupStyle>
  );
}
