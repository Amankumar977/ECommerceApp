import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
  const { seller, isSellerAuthenticated, isSelLoading } = useSelector(
    (state) => state.seller
  );
  if (!isSelLoading && !isSellerAuthenticated) {
    return <Navigate to={"/shop-login"} replace={true} />;
  }

  return children;
};
export default SellerProtectedRoute;
