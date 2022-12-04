import { Spinner, HStack, Heading, Center } from "native-base";
export const Loading = () => {
  return (
    <Center flex={1} bg="dark.100">
      <HStack space={2} justifyContent="center">
        <Spinner color="darkBlue.100" />
        <Heading color="darkBlue.100" fontSize="md">
          Loading...
        </Heading>
      </HStack>
    </Center>
  );
};
