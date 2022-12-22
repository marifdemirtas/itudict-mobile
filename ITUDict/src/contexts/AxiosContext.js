import React, { createContext, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { BACKEND_API_URL } from "../utils/constants";
import { backendApi } from "../utils/urls";
import { storeObjectData } from "../utils/storage";

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
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      }

      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = async (failedRequest) => {
    const options = {
      method: "GET",
      url: `${BACKEND_API_URL}${backendApi.refresh}`,
      headers: {
        Authorization: `Bearer ${authContext.getRefreshToken()}`
      }
    };
    try {
      const tokenRefreshResponse = await axios(options);
      failedRequest.response.config.headers.Authorization = "Bearer " + tokenRefreshResponse.data.accessToken;

      authContext.setAuthState({
        ...authContext.authState,
        accessToken: tokenRefreshResponse.data.accessToken,
        refreshToken: tokenRefreshResponse.data.refreshToken
      });

      await storeObjectData("token", {
        accessToken: tokenRefreshResponse.data.accessToken,
        refreshToken: authContext.authState.refreshToken
      });
      return await Promise.resolve();
    } catch (e) {
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false
      });
    }
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, { pauseInstanceWhileRefreshing: true, statusCodes: [401, 403] });

  return <AxiosContext.Provider value={{ authAxios, publicAxios }}>{children}</AxiosContext.Provider>;
};

export { AxiosContext, AxiosContextProvider };
