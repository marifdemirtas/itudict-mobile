import { Box, Heading, VStack, FormControl, Input, Button, Center, Text, Flex, Link, HStack, Spacer } from "native-base";
import { useState } from "react";

//TODO: Add register logic, validation and error handling
export const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

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
          <FormControl>
            <Input placeholder="Enter your username" onChangeText={(value) => setFormData({ ...formData, username: value })} />
          </FormControl>
          <FormControl>
            <Input placeholder="Enter your ITU email" onChangeText={(value) => setFormData({ ...formData, email: value })} />
          </FormControl>
          <FormControl>
            <Input type="password" placeholder="Enter your password" onChangeText={(value) => setFormData({ ...formData, password: value })} />
          </FormControl>
          <FormControl>
            <Input
              type="password"
              placeholder="Confirm your password"
              onChangeText={(value) => setFormData({ ...formData, passwordConfirm: value })}
            />
          </FormControl>
        </VStack>
      </Box>
      <Box p="3" w="100%" maxW="290" px="0">
        <Button bg="darkBlue.100" _text={{ color: "black", bold: "true" }} w="50%">
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
