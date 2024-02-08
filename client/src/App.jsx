import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SingupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventPage,
  FaqPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  ShopActivationPage,
  ShopLoginPage,
  ShopHomePage,
} from "./Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { fetchShop } from "./redux/reducers/seller";
import { ProtectedRoute, SellerProtectedRoute } from "./ProtectedRoutes/index";
function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { seller, isSellerAuthenticated, isSelLoading } = useSelector(
    (state) => state.seller
  );
  useEffect(() => {
    Store.dispatch(loadUser());
    dispatch(fetchShop());
  }, []);
  return (
    <div className="font-Poppins">
      {loading || isSelLoading ? null : (
        <BrowserRouter>
          <Routes>
            {/* Seller Routes */}
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route
              path="/shopActivation/:activation_Token"
              element={<ShopActivationPage />}
            />
            <Route path="/shop-login" element={<ShopLoginPage />} />
            <Route
              path={`/shopHome/:${seller?._id}`}
              element={
                <SellerProtectedRoute>
                  <ShopHomePage />
                </SellerProtectedRoute>
              }
            />
            {/* Regular Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sing-up" element={<SingupPage />} />
            <Route
              path="/activation/:activation_Token"
              element={<ActivationPage />}
            />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:name" element={<ProductDetailsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition:Bounce
          />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
