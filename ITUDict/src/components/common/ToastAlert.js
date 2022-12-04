import { VStack, HStack, Text, Alert, Center, IconButton, CloseIcon } from "native-base";

export const ToastAlert = ({ id, status, title, description, toast, ...rest }) => {
  return (
    <Center>
      <VStack space={1}>
        <Alert status={status} variant={"outline-light"} alignSelf="center" flexDirection="row" w="95%" bg="dark.100" {...rest}>
          <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={1} alignItems="center" justifyContent="space-between">
              <HStack space={1} flexShrink={1} alignItems="center">
                <Alert.Icon />
                <Text color="warmGray.50">{title}</Text>
              </HStack>
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: "lightText"
                }}
                onPress={() => toast.close(id)}
              />
            </HStack>

            {description && (
              <Text color="warmGray.50" fontSize="sm">
                {description}
              </Text>
            )}
          </VStack>
        </Alert>
      </VStack>
    </Center>
  );
};
