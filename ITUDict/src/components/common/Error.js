import { HStack, Heading, Center, WarningTwoIcon } from "native-base";
export const Error = ({ message }) => {
  return (
    <Center flex={1} bg="dark.100">
      <HStack space={2} justifyContent="center">
        <WarningTwoIcon size="50" color="error.700" />
        <Heading color="darkBlue.100" fontSize="md">
          {"Error: " + message}
        </Heading>
      </HStack>
    </Center>
  );
};
