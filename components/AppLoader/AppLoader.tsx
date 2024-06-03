"use client";

import React, { useState } from "react";
import { Loading } from "@/components/Loading/Loading";

export const AppLoader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return <>{loading ? <Loading /> : children}</>;
};
