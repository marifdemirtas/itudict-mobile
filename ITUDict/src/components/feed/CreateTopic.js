import { useState, useContext } from "react";
import { Button, FormControl, Center, Input, Modal, WarningOutlineIcon } from "native-base";
import { AxiosContext } from "../../contexts/AxiosContext";
import { backendApi } from "../../utils/urls";

export const CreateTopic = ({ topicNavigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [topicName, setTopicName] = useState("");
  const [error, setError] = useState(false);

  const { authAxios } = useContext(AxiosContext);

  const handleCreateTopic = async () => {
    try {
      const response = await authAxios.post(backendApi.topic.create, {
        title: topicName
      });
      if (response?.data) {
        setModalVisible(false);
        topicNavigation(response.data);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Center bg="dark.100">
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content style={{ marginBottom: "auto", marginTop: "30%" }}>
          <Modal.CloseButton />
          <Modal.Header>Create New Topic</Modal.Header>
          <Modal.Body>
            <FormControl isInvalid={error}>
              <Input
                autoComplete="off"
                autoCorrect={false}
                autoCapitalize="none"
                focusOutlineColor="darkBlue.100"
                placeholder="Enter new topic"
                onChangeText={(value) => setTopicName(value)}
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>Topic name is exist, try another one!</FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Center flex={1}>
              <Button w="100%" bg="darkBlue.100" _text={{ color: "black" }} onPress={handleCreateTopic}>
                Create New Topic
              </Button>
            </Center>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Button
        mt="6%"
        bg="dark.100"
        borderWidth="1"
        borderColor="darkBlue.100"
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        Create New Topic
      </Button>
    </Center>
  );
};
