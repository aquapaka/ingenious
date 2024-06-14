import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';
import { useEffect } from 'react';

export default function ProtectedRoute() {
  const userToken = useSelector((state: RootState) => state.auth.userToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate('/login');
    }
  });

  return <Outlet />;
}
