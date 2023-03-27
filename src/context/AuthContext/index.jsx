import React, {
  useContext, useMemo, useState,
} from 'react';

export const AuthContext = React.createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  const value = useMemo(() => ({
    user,
    setUser,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
