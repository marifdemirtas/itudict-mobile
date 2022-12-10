import { Box, Text, Avatar, HStack, Spacer, ScrollView } from "native-base";
import dummyAvatar from "../../../assets/dummy-avatar.png";
export const Profile = () => {
  const user = {
    name: "John Doe",
    username: "canerce99",
    // avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    registerDate: "01/01/2022",
    entries: [
      {
        id: 1,
        topic: "React Native",
        date: "14/01/2022",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet tincidunt ex. Morbi metus quam, egestas molestie erat id, elementum consequat sem. Fusce in accumsan purus, eu suscipit tellus. Mauris vestibulum est sollicitudin, accumsan erat blandit, fringilla augue. Suspendisse quis scelerisque velit. Sed et ante felis. Proin nec consequat metus. Morbi eget nulla et diam congue auctor nec a nunc. Vivamus faucibus elit metus, accumsan ultricies eros pellentesque et. Nam porttitor mi ac urna ullamcorper, et tincidunt metus feugiat. Suspendisse est dui, commodo a laoreet quis, blandit at arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
      },
      {
        id: 2,
        topic: "Sweephy",
        date: "14/01/2022",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet tincidunt ex. Morbi metus quam, egestas molestie erat id, elementum consequat sem. Fusce in accumsan purus, eu suscipit tellus. Mauris vestibulum est sollicitudin, accumsan erat blandit, fringilla augue. Suspendisse quis scelerisque velit. Sed et ante felis. Proin nec consequat metus. Morbi eget nulla et diam congue auctor nec a nunc. Vivamus faucibus elit metus, accumsan ultricies eros pellentesque et. Nam porttitor mi ac urna ullamcorper, et tincidunt metus feugiat. Suspendisse est dui, commodo a laoreet quis, blandit at arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
      },
      {
        id: 3,
        topic: "Sweephy",
        date: "14/01/2022",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet tincidunt ex. Morbi metus quam, egestas molestie erat id, elementum consequat sem. Fusce in accumsan purus, eu suscipit tellus. Mauris vestibulum est sollicitudin, accumsan erat blandit, fringilla augue. Suspendisse quis scelerisque velit. Sed et ante felis. Proin nec consequat metus. Morbi eget nulla et diam congue auctor nec a nunc. Vivamus faucibus elit metus, accumsan ultricies eros pellentesque et. Nam porttitor mi ac urna ullamcorper, et tincidunt metus feugiat. Suspendisse est dui, commodo a laoreet quis, blandit at arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
      }
    ]
  };

  return (
    <ScrollView w="100%" h="100%" bg="dark.100">
      <Box mb="4%" pt="8%" flex={1}>
        <HStack justifyContent="flex-start" mx="6%" space={6}>
          <Avatar size="xl" source={user.avatar ? { uri: user.avatar } : dummyAvatar} />
          <Box>
            <Text fontSize="2xl" color="darkBlue.100">
              {user.username}
            </Text>
            <Text fontSize="xs" color="muted.400">
              Joined {user.registerDate}
            </Text>
          </Box>
        </HStack>
      </Box>
      <Box mb="8%">
        {user.entries.map((entry) => (
          <Box borderColor="muted.400" py="2%" px="4%" key={entry.id}>
            <HStack justifyContent="space-between">
              <Text fontSize="lg" color="darkBlue.100" bold>
                {entry.topic}
              </Text>
              <Text fontSize="xs" color="muted.400" pr="2%">
                {entry.date}
              </Text>
            </HStack>
            <Text fontSize="sm" color="white">
              {entry.comment}
            </Text>
          </Box>
        ))}
      </Box>
    </ScrollView>
  );
};
