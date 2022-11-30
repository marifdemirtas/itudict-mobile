import React from "react";
import { NativeBaseProvider, extendTheme, Center } from "native-base";
import Login from "./src/screens/auth/login/Login";
import Register from "./src/screens/auth/register/Register";

export default function () {
  const theme = extendTheme({
    config: {
      initialColorMode: "dark"
    }
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Center flex={1} bg="dark.100">
        // TODO: add navigation and redux for auth
        <Register />
      </Center>
    </NativeBaseProvider>
  );
}
