import { BrowserRouter, Routes, Route } from "react-router-dom";
/**User Routes */
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
  ShopPreviewPage,
  CheckOutPage,
  PaymentPage,
  OrderSuccess,
  NotFoundPage,
  OrderOverviewPage,
  TrackOrderPage,
  UserInboxPage,
} from "./routes/Routes";
/**Shop Routes */
import {
  ShopCreatePage,
  ShopActivationPage,
  ShopLoginPage,
  ShopHomePage,
  DashBoardPage,
  CreateProductPage,
  AllProductsPage,
  CreateEventPage,
  EventsPage,
  CouponPage,
  ShopAllOrdersPage,
  ShopOrderOverview,
  ShopInboxPage,
} from "./routes/shop.routes";
import { AdminDashboard } from "./routes/admin.routes.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { fetchShop } from "./redux/reducers/seller";
import {
  ProtectedRoute,
  SellerProtectedRoute,
  AdminProtectedRoute,
} from "./ProtectedRoutes";
import Loader from "./components/Layouts/Loader";
import { getAllProducts } from "./redux/reducers/allProducts";
function App() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { isSelLoading } = useSelector((state) => state.seller);
  const { isProductLoading } = useSelector((state) => state.allProducts);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchShop());
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="font-Poppins">
      {loading || isSelLoading || isProductLoading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            {/**Admin Routes */}
            <Route
              path={"/adminDashboard"}
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            {/* Seller Routes */}
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route
              path="/shopActivation/:activation_Token"
              element={<ShopActivationPage />}
            />
            <Route path="/shop-login" element={<ShopLoginPage />} />
            <Route
              path="dashboard"
              element={
                <SellerProtectedRoute>
                  <DashBoardPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path={`/shopHome/:id`}
              element={
                <SellerProtectedRoute>
                  <ShopHomePage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard/products"
              element={
                <SellerProtectedRoute>
                  <AllProductsPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard/create-products"
              element={
                <SellerProtectedRoute>
                  <CreateProductPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard/create-events"
              element={
                <SellerProtectedRoute>
                  <CreateEventPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard/events"
              element={
                <SellerProtectedRoute>
                  <EventsPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard/orders"
              element={
                <SellerProtectedRoute>
                  <ShopAllOrdersPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard/coupons"
              element={
                <SellerProtectedRoute>
                  <CouponPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/shop/order/:id"
              element={
                <SellerProtectedRoute>
                  <ShopOrderOverview />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard/messages"
              element={
                <SellerProtectedRoute>
                  <ShopInboxPage />
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
            <Route path="products" element={<ProductsPage />} />
            <Route path="/products/:name" element={<ProductDetailsPage />} />
            <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
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
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckOutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route path="/orderSuccess" element={<OrderSuccess />} />
            <Route
              path="/user/order/:id"
              element={
                <ProtectedRoute>
                  <OrderOverviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/trackOrder/:id"
              element={
                <ProtectedRoute>
                  <TrackOrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inbox"
              element={
                <ProtectedRoute>
                  <UserInboxPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
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
