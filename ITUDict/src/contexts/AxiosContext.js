import React, { createContext, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { BACKEND_API_URL } from "../utils/constants";
import { backendApi } from "../utils/urls";
import { clearAll, getObjectData, storeObjectData } from "../utils/storage";

const AxiosContext = createContext();

const AxiosContextProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: BACKEND_API_URL
  });

  const publicAxios = axios.create({
    baseURL: BACKEND_API_URL
  });

  authAxios.interceptors.request.use(
    async (config) => {
      const accessToken = await getObjectData("token");
      config.headers.Authorization = `Bearer ${accessToken.accessToken}`;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = async (failedRequest) => {
    const options = {
      method: "GET",
      url: `${BACKEND_API_URL}${backendApi.auth.refresh}`,
      headers: {
        Authorization: `Bearer ${authContext.getRefreshToken()}`
      }
    };
    try {
      const tokenRefreshResponse = await axios(options);
      authContext.setAuthState({
        ...authContext.authState,
        accessToken: tokenRefreshResponse.data.accessToken,
        refreshToken: tokenRefreshResponse.data.refreshToken
      });

      await storeObjectData("token", {
        accessToken: tokenRefreshResponse.data.accessToken,
        refreshToken: tokenRefreshResponse.data.refreshToken,
        role: authContext.authState.role,
        email: authContext.authState.email
      });
      failedRequest.response.config.headers.Authorization = "Bearer " + tokenRefreshResponse.data.accessToken;
      return await Promise.resolve();
    } catch (e) {
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        role: null,
        email: null
      });
      clearAll();
    }
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, { pauseInstanceWhileRefreshing: true });

  return <AxiosContext.Provider value={{ authAxios, publicAxios }}>{children}</AxiosContext.Provider>;
};

export { AxiosContext, AxiosContextProvider };
