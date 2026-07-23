import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authStorage } from "../storage/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = authStorage.getUser();
    const storedToken = authStorage.getToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  const login = ({ user, token }) => {
    authStorage.saveToken(token);
    authStorage.saveUser(user);

    setUser(user);
  };

  const logout = () => {
    authStorage.clearSession();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}