import { Heading, HStack, IconButton, VStack, Box, Text, ScrollView, useToast } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Pagination } from "../../components/common/Pagination";
import { useState, useContext, useCallback } from "react";
import { Pressable } from "react-native";
import { AxiosContext } from "../../contexts/AxiosContext";
import { backendApi } from "../../utils/urls";
import { getError } from "../../utils/error";
import { Loading } from "../../components/common/Loading";
import { CreateComment } from "../../components/feed/CreateComment";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

export const TopicPage = ({ route, navigation }) => {
  const [page, setPage] = useState({
    currentPage: 1,
    totalPage: 1,
    totalCount: 1
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authAxios } = useContext(AxiosContext);
  const toast = useToast();

  const setCurrentPage = (page_) => {
    setPage({ ...page, currentPage: page_ });
  };

  const fetchTopicComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authAxios.get(backendApi.comment.getByTopic(route.params.topic._id, page.currentPage - 1, 10));
      if (response?.data) {
        const comments = response.data?.comments?.map((item) => {
          let _item = { ...item };
          _item.ownerId = item?.owner?._id;
          _item.ownerUsername = item?.owner?.username;
          _item.ownerRole = item?.owner?.role;
          _item.ownerEmail = item?.owner?.email;
          _item.ownerJoined = item?.owner?.createdAt;
          _item.createdAt = new Date(item.createdAt).toDateString();
          delete _item.owner;
          return _item;
        });
        setData(comments);
        setPage({ ...page, totalCount: response.data.count, totalPage: Math.ceil(response.data.count / 10) });
      }
    } catch (error) {
      getError(error?.response?.data?.message || "Failed to fetch comments", "Fetch Error", toast);
    } finally {
      setIsLoading(false);
    }
  }, [page.currentPage]);

  const likeComment = async (commentId) => {
    try {
      const response = await authAxios.post(backendApi.comment.like(commentId));
      if (response?.data) {
        const _data = data.map((item) => {
          if (item._id === commentId) {
            return { ...item, likes: response.data.likes, dislikes: response.data.dislikes };
          }
          return item;
        });
        setData(_data);
      }
    } catch (error) {
      getError(error?.response?.data?.message || "Failed to like comment", "Network Error", toast);
    }
  };

  const dislikeComment = async (commentId) => {
    try {
      const response = await authAxios.post(backendApi.comment.dislike(commentId));
      if (response?.data) {
        const _data = data.map((item) => {
          if (item._id === commentId) {
            return { ...item, likes: response.data.likes, dislikes: response.data.dislikes };
          }
          return item;
        });
        setData(_data);
      }
    } catch (error) {
      getError(error?.response?.data?.message || "Failed to dislike comment", "Network Error", toast);
    }
  };

  const handleCreateComment = async (content) => {
    try {
      const response = await authAxios.post(backendApi.comment.create, {
        topicId: route.params.topic._id,
        title: route.params.topic.title,
        content: content
      });
      if (response?.data) {
        if (page.totalCount % 10 === 0 && page.totalCount !== 0) {
          setPage((prev) => ({ ...prev, totalPage: prev.totalPage + 1, currentPage: prev.totalPage + 1 }));
        } else {
          fetchTopicComments();
        }
      }
    } catch (error) {
      getError(error?.response?.data?.message || "Failed to create comment", "Creation Error", toast);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTopicComments();
    }, [page.currentPage])
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box bg="dark.100" w="100%" h="100%">
          <ScrollView>
            <Heading color="darkBlue.100" ml="6%" mt="5%">
              {route.params.topic.title}
            </Heading>
            {data.map((item, index) => (
              <Box borderBottomWidth="1" borderColor="muted.400" py="4%" key={index}>
                <VStack key={index} mx="5%" justifyContent="space-around">
                  <Pressable
                    onPress={() =>
                      navigation.navigate("UserProfile", {
                        username: item.ownerUsername,
                        email: item.ownerEmail,
                        joined: item.ownerJoined,
                        role: item.ownerRole,
                        id: item.ownerId
                      })
                    }
                  >
                    <Text color="darkBlue.100" fontSize="md" mb="-1%">
                      {item.ownerUsername}
                    </Text>
                    <Text color="muted.400" fontSize="xs" mb="1%">
                      {item.ownerRole}
                    </Text>
                  </Pressable>

                  <Text color="white">{item.content}</Text>
                  <HStack justifyContent="space-between">
                    <HStack alignItems="center">
                      <IconButton
                        key="like"
                        _icon={{ as: AntDesign, name: "arrowup", color: "darkBlue.100" }}
                        onPress={() => likeComment(item._id)}
                      />
                      <Text color="muted.400">{item.likes}</Text>
                      <IconButton
                        key="dislike"
                        _icon={{ as: AntDesign, name: "arrowdown", color: "darkBlue.100" }}
                        onPress={() => dislikeComment(item._id)}
                      />
                      <Text textAlign={"center"} color="muted.400">
                        {item.dislikes}
                      </Text>
                    </HStack>
                    <Text fontSize="xs" color="muted.400" mr="2%">
                      {item.createdAt}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            ))}
            {(page.currentPage === page.totalPage || page.totalCount === 0) && <CreateComment handleCreateComment={handleCreateComment} />}
            {page.totalPage > 1 && <Pagination currentPage={page.currentPage} totalPage={page.totalPage} setCurrentPage={setCurrentPage} />}
          </ScrollView>
        </Box>
      )}
    </>
  );
};
