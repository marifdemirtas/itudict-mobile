import { useState, useContext } from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, Text, Link, Spacer, useToast, WarningOutlineIcon } from "native-base";
import { AuthContext } from "../../../contexts/AuthContext";
import { backendApi } from "../../../utils/urls";
import { AxiosContext } from "../../../contexts/AxiosContext";
import { storeObjectData } from "../../../utils/storage";
import { getError } from "../../../utils/error";
import { ituEmailRegexCheck } from "../../../utils/basicUtils";

export const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isInvalid, setIsInvalid] = useState({
    email: false,
    password: false
  });

  const toast = useToast();
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const handleLogin = async () => {
    const isValid_ = {
      email: false,
      password: false
    };
    if (!ituEmailRegexCheck(formData.email)) {
      isValid_.email = true;
    }
    if (formData.password.length < 6) {
      isValid_.password = true;
    }

    if (Object.values(isValid_).includes(true)) {
      setIsInvalid(isValid_);
      return;
    }

    try {
      const response = await publicAxios.post(backendApi.auth.login, formData);

      if (response?.data) {
        authContext.setAuthState({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          isAuthenticated: true,
          role: response.data.role,
          email: formData.email
        });

        await storeObjectData("token", {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          role: response.data.role,
          email: formData.email
        });
      }
    } catch (error) {
      getError(error?.response?.data?.message || "Please check your credentials!", "Login Failed", toast);
    }
  };

  return (
    <Center w="100%" flex={1} bg="dark.100">
      <Box p="3" w="100%" maxW="290" px="0">
        <Center>
          <Heading
            size="md"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50"
            }}
            fontWeight="bold"
          >
            Welcome to ITU Dictionary
          </Heading>
          <Heading mt="1" color="coolGray.400" fontWeight="medium" size="xs">
            Let's log you in quickly
          </Heading>
        </Center>
        <VStack space={6} mt="5">
          <FormControl isInvalid={isInvalid.email}>
            <Input
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter your ITU email"
              onChangeText={(value) => setFormData({ ...formData, email: value })}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Please enter your ITU email</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={isInvalid.password}>
            <Input
              autoComplete="off"
              autoCapitalize="none"
              type="password"
              autoCorrect={false}
              placeholder="Enter your password"
              onChangeText={(value) => setFormData({ ...formData, password: value })}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Password must be at least 6 characters</FormControl.ErrorMessage>
          </FormControl>
        </VStack>
      </Box>
      <Box p="3" w="100%" maxW="290" px="0">
        <Button
          bg="darkBlue.100"
          _text={{ color: "black", bold: "true" }}
          w="50%"
          onPress={handleLogin}
          isDisabled={formData.email.length === 0 || formData.password.length === 0}
        >
          LOGIN
        </Button>
      </Box>
      <Box p="2" w="100%" maxW="290" px="0">
        <Text bold>don't have an account?</Text>
        <Spacer />
        <Link w="25%" onPress={() => navigation.navigate("Register")} _text={{ color: "darkBlue.100", bold: "true" }} isUnderlined={false}>
          sign up
        </Link>
      </Box>
    </Center>
  );
};
