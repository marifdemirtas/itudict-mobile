import { useState, useContext } from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, Text, Flex, Link, Spacer, useToast } from "native-base";
import { AuthContext } from "../../../contexts/AuthContext";
import { backendApi } from "../../../utils/urls";
import { ToastAlert } from "../../../components/common/ToastAlert";
import { AxiosContext } from "../../../contexts/AxiosContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeObjectData } from "../../../services/utils/storage";
import { getError } from "../../../services/utils/error";

//TODO: Add validation and error handling
export const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const toast = useToast();
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const handleLogin = async () => {
    const { email, password } = formData;
    if (email === "Admin" && password === "Admin") {
      authContext.setAuthState({
        isAuthenticated: true,
        accessToken: email,
        refreshToken: password
      });
    }

    // try {
    //   const response = await publicAxios.post(backendApi.login, {
    //     email,
    //     password
    //   });

    //   if (response?.data) {
    //     authContext.setAuthState({
    //       accessToken: response.data.accessToken,
    //       refreshToken: response.data.refreshToken,
    //       isAuthenticated: true
    //     });

    //     await storeObjectData("token", {
    //       accessToken: response.data.accessToken,
    //       refreshToken: response.data.refreshToken
    //     });
    //   }
    // } catch (error) {
    //   getError(error, "Login Failed", toast)
    //   });
    // }
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
          <FormControl>
            <Input placeholder="Enter your ITU email" onChangeText={(value) => setFormData({ ...formData, email: value })} />
          </FormControl>
          <FormControl>
            <Input type="password" placeholder="Enter your password" onChangeText={(value) => setFormData({ ...formData, password: value })} />
          </FormControl>
        </VStack>
      </Box>
      <Box p="3" w="100%" maxW="290" px="0">
        <Button bg="darkBlue.100" _text={{ color: "black", bold: "true" }} w="50%" onPress={handleLogin}>
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
