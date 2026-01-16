import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes({ allowedRoles = [],children }) {
  const { user, isAuthenticated } = useSelector((state) => state.user);

 
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

 
  if (
    allowedRoles.length > 0 &&
    !user.roles.some((role) => allowedRoles.includes(role))
  ) {
    return <Navigate to="/dashboard" replace />;
  }


  return children
};

export default ProtectedRoutes