import { Box, Heading, VStack, FormControl, Input, Button, Center, Text, Link, Spacer, useToast, WarningOutlineIcon } from "native-base";
import { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { backendApi } from "../../../utils/urls";
import { AxiosContext } from "../../../contexts/AxiosContext";
import { storeObjectData } from "../../../utils/storage";
import { getError } from "../../../utils/error";
import { ituEmailRegexCheck } from "../../../utils/basicUtils";

export const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [isInvalid, setIsInvalid] = useState({
    username: false,
    email: false,
    password: false,
    passwordConfirm: false
  });

  const toast = useToast();
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const handleRegister = async () => {
    const isValid_ = {
      username: false,
      email: false,
      password: false,
      passwordConfirm: false
    };

    if (!ituEmailRegexCheck(formData.email)) {
      isValid_.email = true;
    }
    if (formData.password.length < 6) {
      isValid_.password = true;
    }
    if (formData.password !== formData.passwordConfirm) {
      isValid_.passwordConfirm = true;
    }

    if (Object.values(isValid_).includes(true)) {
      setIsInvalid(isValid_);
      return;
    }

    try {
      const response = await publicAxios.post(backendApi.auth.register, formData);
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
      getError(error?.response?.data?.message || "Please check your credentials!", "Registration Failed", toast);
    }
  };

  return (
    <Center flex={1} bg="dark.100">
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
            Let's sign you up quickly
          </Heading>
        </Center>

        <VStack space={6} mt="5">
          <FormControl isInvalid={isInvalid.username}>
            <Input
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="none"
              placeholder="Enter your username"
              onChangeText={(value) => setFormData({ ...formData, username: value })}
            />
          </FormControl>
          <FormControl isInvalid={isInvalid.email}>
            <Input
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="none"
              placeholder="Enter your ITU email"
              onChangeText={(value) => setFormData({ ...formData, email: value })}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Please enter your ITU email</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={isInvalid.password}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="off"
              type="password"
              placeholder="Enter your password"
              onChangeText={(value) => setFormData({ ...formData, password: value })}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Password must be at least 6 characters</FormControl.ErrorMessage>
          </FormControl>
          <FormControl isInvalid={isInvalid.passwordConfirm}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="off"
              type="password"
              placeholder="Confirm your password"
              onChangeText={(value) => setFormData({ ...formData, passwordConfirm: value })}
            />
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Passwords does not match</FormControl.ErrorMessage>
          </FormControl>
        </VStack>
      </Box>
      <Box p="3" w="100%" maxW="290" px="0">
        <Button
          bg="darkBlue.100"
          _text={{ color: "black", bold: "true" }}
          w="50%"
          onPress={handleRegister}
          isDisabled={
            formData.email.length === 0 || formData.password.length === 0 || formData.passwordConfirm.length === 0 || formData.username.length === 0
          }
        >
          SIGN UP
        </Button>
      </Box>
      <Box p="2" w="100%" maxW="290" px="0">
        <Text bold>already have an account?</Text>
        <Spacer />
        <Link w="25%" onPress={() => navigation.navigate("Login")} _text={{ color: "darkBlue.100", bold: "true" }} isUnderlined={false}>
          login
        </Link>
      </Box>
    </Center>
  );
};
