import { Box, Heading, VStack, FormControl, Input, Button, Center, Text, Flex, Link, HStack, Spacer } from "native-base";

const Register = () => {
  return (
    <Flex w="100%">
      <Center w="100%">
        <Box safeArea p="2" w="100%" maxW="290" py="8">
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
              <Input placeholder="Enter your username" />
            </FormControl>
            <FormControl>
              <Input placeholder="Enter your ITU email" />
            </FormControl>
            <FormControl>
              <Input type="password" placeholder="Enter your password" />
            </FormControl>
            <FormControl>
              <Input type="password" placeholder="Confirm your password" />
            </FormControl>
          </VStack>
        </Box>
      </Center>
      <Center w="100%">
        <Box p="2" w="100%" maxW="290">
          <Button bg="darkBlue.100" _text={{ color: "black", bold: "true" }} w="50%">
            SIGN UP
          </Button>
        </Box>
        <Box p="2" w="100%" maxW="290">
          <Text bold>already have an account?</Text>
          <Spacer />
          <Link href="www.google.com" _text={{ color: "darkBlue.100", bold: "true" }} isUnderlined={false}>
            login
          </Link>
        </Box>
      </Center>
    </Flex>
  );
};

export default Register;
