import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface PrivateRouteProps {
  children?: React.ReactNode;
  redirectTo?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectTo = '/login'
}) => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    // Guardamos la ubicación actual para redirigir después del login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Si hay children los renderizamos, si no, renderizamos el Outlet
  return children ? <>{children}</> : <Outlet />;
};