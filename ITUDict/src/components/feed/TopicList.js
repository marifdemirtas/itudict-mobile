import { Text, Box, HStack, Spacer, Pressable, Center, ScrollView } from "native-base";
import { CreateTopic } from "../../components/feed/CreateTopic";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const TopicList = ({ data, topicNavigation }) => {
  const authContext = useContext(AuthContext);
  return (
    <Box bg="dark.100" w="100%" h="100%">
      <ScrollView w="100%">
        {authContext.getRole() == "Senior" && <CreateTopic topicNavigation={topicNavigation} />}
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
                  {item.title}
                </Text>

                <Spacer />
                <Center>
                  <Text fontSize="sm" color="white" bold>
                    {item.comment_count}
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
