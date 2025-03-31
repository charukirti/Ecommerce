import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./components/ui/AppLayout";
import Home from "./pages/Home";

import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import CheckoutPage from "./pages/Checkout";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Orders from "./pages/Orders";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgotpassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },

      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/products/category/:categoryUrl",
        element: <Products />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
      {
        path: "/success",
        element: (
          <ProtectedRoute>
            <Success />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cancel",
        element: (
          <ProtectedRoute>
            <Cancel />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/auth",
    children: [
      {
        path: "signin",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgot-password",
        element: <Forgotpassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
