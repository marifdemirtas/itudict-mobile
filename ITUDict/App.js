import React from "react";
import { NativeBaseProvider, Box, Center, extendTheme } from "native-base";

const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6"
  }
};
const theme = extendTheme({ colors: newColorTheme });

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Center flex={1}>
        <Box>Welcome to ITUDict!</Box>
      </Center>
    </NativeBaseProvider>
  );
}
