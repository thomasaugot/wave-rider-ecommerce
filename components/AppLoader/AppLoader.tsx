"use client";

import React, { useState } from "react";
import Loading from "@/components/Loading/Loading";

const AppLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  // Simulating loading completion after 6 seconds
  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return <>{loading ? <Loading /> : children}</>;
};

export default AppLoader;
