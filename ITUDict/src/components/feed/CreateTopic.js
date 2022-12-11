import { useState } from "react";
import { Button, FormControl, Center, Input, Modal } from "native-base";

export const CreateTopic = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Center bg="dark.100">
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content style={{ marginBottom: "auto", marginTop: "30%" }}>
          <Modal.CloseButton />
          <Modal.Header>Create New Topic</Modal.Header>
          <Modal.Body>
            <FormControl>
              <Input focusOutlineColor="darkBlue.100" placeholder="Enter new topic" />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Center flex={1}>
              <Button
                w="100%"
                bg="darkBlue.100"
                _text={{ color: "black" }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
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
