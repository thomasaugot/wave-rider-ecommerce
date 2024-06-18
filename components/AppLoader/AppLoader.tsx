"use client";

import React, { useState } from "react";
import { Loading } from "@/components/Loading/Loading";

export const AppLoader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return <>{loading ? <Loading /> : children}</>;
};
