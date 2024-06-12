import { useLocation } from 'react-router-dom';
import { RegisterForm } from './components/register-form';
import { LoginForm } from './components/login-form';
import { LOGIN_PATHNAME, REGISTER_PATHNAME } from '../../../const/const';

export default function LoginRegisterPage() {
  const location = useLocation();

  return (
    <div className="flex h-screen justify-center items-center">
      <LoginForm isHidden={location.pathname !== LOGIN_PATHNAME} />
      <RegisterForm isHidden={location.pathname !== REGISTER_PATHNAME} />
    </div>
  );
}
