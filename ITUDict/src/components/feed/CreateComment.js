import { useState, useContext, useEffect } from "react";
import { AxiosContext } from "../../contexts/AxiosContext";
import { backendApi } from "../../utils/urls";
import { useToast, Box, VStack, TextArea, Button } from "native-base";
import { getError } from "../../utils/error";

export const CreateComment = ({ topicId, title, fetchTopicComments }) => {
  const [comment, setComment] = useState("");
  const toast = useToast();
  const { authAxios } = useContext(AxiosContext);

  const createComment = async () => {
    try {
      const response = await authAxios.post(backendApi.comment.create, {
        topicId: topicId,
        title: title,
        content: comment
      });
      if (response?.data) {
        fetchTopicComments();
      }
    } catch (error) {
      getError(error?.response?.data?.message || "Failed to create comment", "Creation Error", toast);
    }
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
          _focus={{ borderColor: "darkBlue.100", backgroundColor: "muted.400", color: "black" }}
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          onChangeText={(text) => setComment(text)}
        />
        <Button marginLeft="auto" w="35%" textAlign="center" bg="dark.100" borderColor="darkBlue.100" borderWidth="1" onPress={createComment}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};
