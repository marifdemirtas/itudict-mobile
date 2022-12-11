import { Center, Heading, HStack, IconButton, VStack, Box, Text, ScrollView, TextArea, Button, Spacer } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Pagination } from "../../components/common/Pagination";
import { useState } from "react";

export const TopicPage = ({ route }) => {
  const [page, setPage] = useState({
    currentPage: 1,
    totalPages: 5
  });
  const [textAreaValue, setTextAreaValue] = useState("");

  const setCurrentPage = (page_) => {
    setPage({ ...page, currentPage: page_ });
  };

  const data = [
    {
      id: 1,
      author: "John Doe",
      published: "2021-01-01",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet tincidunt ex. Morbi metus quam, egestas molestie erat id, elementum consequat sem. Fusce in accumsan purus, eu suscipit tellus. Mauris vestibulum est sollicitudin, accumsan erat blandit, fringilla augue. Suspendisse quis scelerisque velit. Sed et ante felis. Proin nec consequat metus. Morbi eget nulla et diam congue auctor nec a nunc. Vivamus faucibus elit metus, accumsan ultricies eros pellentesque et. Nam porttitor mi ac urna ullamcorper, et tincidunt metus feugiat. Suspendisse est dui, commodo a laoreet quis, blandit at arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },
    {
      id: 2,
      author: "Jane Doe",
      published: "2021-01-01",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet tincidunt ex. Morbi metus quam, egestas molestie erat id, elementum consequat sem. Fusce in accumsan purus, eu suscipit tellus. Mauris vestibulum est sollicitudin, accumsan erat blandit, fringilla augue. Suspendisse quis scelerisque velit. Sed et ante felis. Proin nec consequat metus. Morbi eget nulla et diam congue auctor nec a nunc. Vivamus faucibus elit metus, accumsan ultricies eros pellentesque et. Nam porttitor mi ac urna ullamcorper, et tincidunt metus feugiat. Suspendisse est dui, commodo a laoreet quis, blandit at arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    },
    {
      id: 3,
      author: "John Doe",
      published: "2021-01-01",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet tincidunt ex. Morbi metus quam, egestas molestie erat id, elementum consequat sem. Fusce in accumsan purus, eu suscipit tellus. Mauris vestibulum est sollicitudin, accumsan erat blandit, fringilla augue. Suspendisse quis scelerisque velit. Sed et ante felis. Proin nec consequat metus. Morbi eget nulla et diam congue auctor nec a nunc. Vivamus faucibus elit metus, accumsan ultricies eros pellentesque et. Nam porttitor mi ac urna ullamcorper, et tincidunt metus feugiat. Suspendisse est dui, commodo a laoreet quis, blandit at arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
    }
  ];
  return (
    <Center bg="dark.100" w="100%" h="100%">
      <ScrollView>
        <Heading color="darkBlue.100" ml="5%" mt="5%">
          {route.params.topic.topic}
        </Heading>
        {data.map((item, index) => (
          <Box borderBottomWidth="1" borderColor="muted.400" py="4%" key={index}>
            <VStack key={index} mx="5%" justifyContent="space-around">
              <Text color="muted.400" fontSize="md" mb="1%">
                {item.author}
              </Text>
              <Text color="white">{item.comment}</Text>
              <HStack justifyContent="space-between">
                <HStack>
                  <IconButton key="like" _icon={{ as: AntDesign, name: "arrowup", color: "darkBlue.100" }} />
                  <IconButton key="dislike" _icon={{ as: AntDesign, name: "arrowdown", color: "darkBlue.100" }} />
                </HStack>
                <Text fontSize="xs" color="muted.400" mr="2%">
                  {item.published}
                </Text>
              </HStack>
            </VStack>
          </Box>
        ))}
        {page.currentPage === page.totalPages && (
          <Box alignItems="center" w="100%" my="8%">
            <VStack w="85%" space={3}>
              <TextArea
                size="md"
                h={150}
                placeholder="Write an entry..."
                bg="muted.400"
                color="black"
                _focus={{ borderColor: "darkBlue.100", backgroundColor: "muted.400", color: "black" }}
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.currentTarget.value)}
                onChangeText={(text) => setTextAreaValue(text)}
              />
              <Button marginLeft="auto" w="35%" textAlign="center" bg="dark.100" borderColor="darkBlue.100" borderWidth="1">
                Submit
              </Button>
            </VStack>
          </Box>
        )}
        <Pagination totalPages={page.totalPages} currentPage={page.currentPage} setCurrentPage={setCurrentPage} />
      </ScrollView>
    </Center>
  );
};
