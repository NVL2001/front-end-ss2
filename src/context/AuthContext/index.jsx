import React, {
  useContext, useMemo, useState,
} from 'react';

export const AuthContext = React.createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '555-555-5555',
    address: '123 Main St.',
    shoppingHistory: [],
    vouchers: [],
  });

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
