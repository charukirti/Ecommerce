import { useNavigate } from "react-router";

import { ReactNode, useEffect } from "react";
import useGetCurrentUser from "../hooks/auth/useGetCurrentUser";

interface ProtectedRouteProp {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProp) {
  const navigate = useNavigate();

  // load authenticated user
  const { userData, isLoading } = useGetCurrentUser();
  const isAuthenticated = userData?.user.id;

  // if there is no user, redirect to login

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/auth/signin");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isAuthenticated) return children;
}
