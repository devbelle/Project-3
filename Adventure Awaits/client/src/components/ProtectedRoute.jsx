import { Route, Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ element, ...rest }) {
  const token = localStorage.getItem('token');
  const isAuthenticated = token != null;
  const location = useLocation();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}

export default ProtectedRoute;