import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';

export const AuthContext = React.createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const setUserAvatar = (url) => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.avatarURL = url;
    setUser(user);
  };

  const value = useMemo(() => ({
    user,
    setUser,
    setUserAvatar
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
