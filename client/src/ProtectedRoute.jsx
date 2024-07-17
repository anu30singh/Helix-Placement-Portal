import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/unauthorized" />;
  }

  if (user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
