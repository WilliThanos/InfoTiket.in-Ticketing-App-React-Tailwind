import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login.jsx";
import Landing from "./pages/Landing.jsx";
import Register from "./pages/Register.jsx";
import Search from "./pages/Search.jsx";
import BookingDetail from "./pages/BookingDetail.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Payment from "./pages/Payment.jsx";
import Profile from "./pages/Profile.jsx";
import VerifikasiEmail from "./pages/VerifikasiEmail.jsx";

import History from "./pages/History.jsx";

import ForgotPassword from "./pages/ForgotPassword.jsx";
import ConfirmPassword from "./pages/ConfirmEmail.jsx";
import KonfirmasiPembayaran from "./pages/KonfirmasiPembayaran.jsx";
import { useSelector } from "react-redux";
import PrivateRoute from "./routes/PrivateRoutes.jsx";
import AuthCallback from "./components/AuthCallback.jsx";
import Admin from "./pages/admin.jsx";
export const baseApiURL = "https://expressjs-develop-b4d1.up.railway.app/api";

export default function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   !!useSelector((state) => state?.auth?.token)
  // );

  const router = createBrowserRouter([
    {
      path: "/auth-callback",
      element: <AuthCallback />,
    },
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/mengatur-ulang-kata-sandi",
      element: <ConfirmPassword />,
    },
    {
      path: "/verifikasi-email",
      element: <VerifikasiEmail />,
    },
    {
      path: "/konfirmasi-pembayaran",
      element: <KonfirmasiPembayaran />,
    },
    {
      path: "/search",
      element: <Search />,
    },

    {
      element: <PrivateRoute />, // Protect the following routes
      children: [
        {
          path: "history",
          element: <History />,
        },
        {
          path: "/booking-detail",
          element: <BookingDetail />,
        },
        {
          path: "/payment",
          element: <Payment />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
      ],
    },
  ]);

  return (
    <GoogleOAuthProvider clientId="577039318480-keloe0f9dbv0haradhntr0792eu1bfcs.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}
