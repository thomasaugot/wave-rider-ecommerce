"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const initialUserContext: UserContextType = {
  user: null,
  setUser: () => {},
};

const UserContext = createContext<UserContextType>(initialUserContext);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  console.log("User logged in -->", user);

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (userString) {
      const parsedUser = JSON.parse(userString);
      setUser(parsedUser.user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
