import { createContext, useState } from "react";
import { clearAll } from "../utils/storage";
import { useToast } from "native-base";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    role: null,
    accessToken: null,
    refreshToken: null,
    email: null
  });

  const logout = async () => {
    await clearAll();
    setAuthState({
      isAuthenticated: false,
      role: null,
      accessToken: null,
      refreshToken: null,
      email: null
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const getRefreshToken = () => {
    return authState.refreshToken;
  };

  const getRole = () => {
    return authState.role;
  };

  const getEmail = () => {
    return authState.email;
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        getAccessToken,
        getRefreshToken,
        getRole,
        getEmail,
        setAuthState,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
