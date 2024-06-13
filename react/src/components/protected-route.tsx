import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';

export default function ProtectedRoute() {
  const userToken = useSelector((state: RootState) => state.auth.userToken);
  const navigate = useNavigate();

  if (!userToken) {
    navigate('/login');
  }

  return <Outlet />;
}
