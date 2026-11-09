import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, accessToken } = useSelector(
    (state) => state.auth,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
