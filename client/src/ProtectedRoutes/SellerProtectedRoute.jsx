import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layouts/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { seller, isSellerAuthenticated, isSelLoading } = useSelector(
    (state) => state.seller
  );
  if (isSelLoading) {
    <Loader />;
  } else {
    if (!isSelLoading && !isSellerAuthenticated) {
      return <Navigate to={"/shop-login"} replace={true} />;
    }

    return children;
  }
};
export default SellerProtectedRoute;
