import { Text, Box, HStack, Spacer, Pressable, Center, ScrollView } from "native-base";
import { CreateTopic } from "../../components/feed/CreateTopic";

export const TopicList = ({ data, isSenior, topicNavigation }) => {
  return (
    <Box bg="dark.100" w="100%" h="100%">
      <ScrollView w="100%">
        {isSenior && <CreateTopic />}
        {data.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              topicNavigation(item);
            }}
          >
            <Box borderBottomWidth="1" borderColor="muted.400" pl={["0", "4"]} pr={["0", "5"]} py="2%">
              <HStack space={[2, 3]} justifyContent="space-between" px="5%" py="2%">
                <Text fontSize="md" color="darkBlue.100" bold>
                  {item.topic}
                </Text>

                <Spacer />
                <Center>
                  <Text fontSize="sm" color="white" bold>
                    {item.entryCount}
                  </Text>
                </Center>
              </HStack>
            </Box>
          </Pressable>
        ))}
      </ScrollView>
    </Box>
  );
};
