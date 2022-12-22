import { createContext, useState } from "react";
import { clearAll } from "../utils/storage";
import { useToast } from "native-base";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null
  });

  const logout = async () => {
    await clearAll();
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const getRefreshToken = () => {
    return authState.refreshToken;
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        getAccessToken,
        getRefreshToken,
        setAuthState,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
