import { useContext, useState, useCallback, useEffect } from "react";
import { Login } from "../screens/auth/login/Login";
import * as Keychain from "react-native-keychain";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";
import { Register } from "../screens/auth/register/Register";
import { Loading } from "../components/common/Loading";
import { TabBar } from "react-native-tab-view";
import { HomeTabs } from "./HomeTabs";

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState("loading");

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      if (value) {
        const jwt = JSON.parse(value.password);

        authContext.setAuthState({
          accessToken: jwt.accessToken || null,
          refreshToken: jwt.refreshToken || null,
          isAuthenticated: jwt.accessToken !== null,
        });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    >
      {status === "loading" ? (
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{
            headerShown: false,
          }}
        />
      ) : authContext.authState.isAuthenticated ? (
        // TODO: Feed component
        <Stack.Screen name="Home" component={HomeTabs} />
      ) : (
        // <Stack.Group>
        //   <Stack.Screen name="Login" component={Login} />
        //   <Stack.Screen name="Register" component={Register} />
        // </Stack.Group>
        <Stack.Screen name="Home" component={HomeTabs} />
      )}
    </Stack.Navigator>
  );
};
