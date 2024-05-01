import { Route, Navigate, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

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

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};



export default ProtectedRoute;