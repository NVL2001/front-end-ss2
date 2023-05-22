import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { UserRoles } from "../../constants/UserRoles";

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
    // const jwt = localStorage.getItem("jwt");
    // if (jwt) {
    //   const decodedJwt = jwtDecode(jwt);
    //   const roles = decodedJwt.role.map((item) => item.authority);
    //   if (roles.includes(UserRoles.ADMIN) || roles.includes(UserRoles.STAFF)) {
    //     window.location.href = '/admin/dashboard';
    //   }
    // }
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
