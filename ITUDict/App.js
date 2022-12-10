import { NativeBaseProvider, extendTheme, StatusBar } from "native-base";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { AxiosContextProvider } from "./src/contexts/AxiosContext";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./src/navigation/AuthNavigator";

export default function () {
  const theme = extendTheme({
    config: {
      initialColorMode: "dark",
    },
  });
  return (
    <NativeBaseProvider theme={theme}>
      <AuthContextProvider>
        <AxiosContextProvider>
          <NavigationContainer>
            <StatusBar />
            <AuthNavigator />
          </NavigationContainer>
        </AxiosContextProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
