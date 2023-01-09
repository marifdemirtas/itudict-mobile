import { useState } from "react";
import { Box, VStack, TextArea, Button } from "native-base";

export const CreateComment = ({ handleCreateComment }) => {
  const [comment, setComment] = useState("");

  const onSubmit = async () => {
    handleCreateComment(comment);
  };

  return (
    <Box alignItems="center" w="100%" my="6%">
      <VStack w="88%" space={3}>
        <TextArea
          size="md"
          h={150}
          placeholder="Write an entry..."
          bg="muted.400"
          color="black"
          autoCorrect={false}
          autoCapitalize="none"
          _focus={{ borderColor: "darkBlue.100", backgroundColor: "muted.400", color: "black" }}
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          onChangeText={(text) => setComment(text)}
        />
        <Button marginLeft="auto" w="35%" textAlign="center" bg="dark.100" borderColor="darkBlue.100" borderWidth="1" onPress={onSubmit}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};
