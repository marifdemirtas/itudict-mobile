import { useContext, useState, useCallback, useEffect } from "react";
import { Login } from "../screens/auth/login/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";
import { Register } from "../screens/auth/register/Register";
import { Loading } from "../components/common/Loading";
import { HomeTabs } from "./HomeTabs";
import { getObjectData } from "../services/utils/storage";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState("loading");

  const loadJWT = useCallback(async () => {
    try {
      const jwt = await getObjectData("token");
      if (jwt) {
        authContext.setAuthState({
          accessToken: jwt.accessToken || null,
          refreshToken: jwt.refreshToken || null,
          isAuthenticated: jwt.accessToken !== null
        });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}>
      {status === "loading" ? (
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{
            headerShown: false
          }}
        />
      ) : authContext.authState.isAuthenticated ? (
        <Stack.Screen name="Home" component={HomeTabs} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
