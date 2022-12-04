import { createContext, useState } from "react";
import * as Keychain from "react-native-keychain";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
