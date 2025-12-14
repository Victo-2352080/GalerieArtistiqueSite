import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginContext } from '../Contexts/LoginContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useContext(LoginContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: '/ajouter' }} replace />;
  }

  return <>{children}</>;
}
