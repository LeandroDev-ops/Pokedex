import React from "react";

import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export default function PrivateRoute({
  children,
}: PrivateRouteProps) {
  const { user } = useAuth();

  if (user === null) {
    const storageUser = localStorage.getItem(
      "@pokemon:user"
    );

    if (!storageUser) {
      return <Navigate to="/" />;
    }
  }

  return children;
}