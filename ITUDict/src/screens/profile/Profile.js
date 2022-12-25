import { Box, Text, Avatar, HStack, ScrollView, useToast } from "native-base";
import dummyAvatar from "../../../assets/dummy-avatar.png";
import React, { useState, useCallback, useContext } from "react";
import { Pagination } from "../../components/common/Pagination";
import { AxiosContext } from "../../contexts/AxiosContext";
import { backendApi } from "../../utils/urls";
import { getError } from "../../utils/error";
import { AuthContext } from "../../contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "../../components/common/Loading";
import { Pressable } from "react-native";

export const Profile = ({ route, navigation }) => {
  const [page, setPage] = useState({
    currentPage: 1,
    totalPage: 1,
    totalCount: 1
  });
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  const toast = useToast();

  const fetchCurrentUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await authAxios.get(backendApi.user.find(authContext.getEmail()));
      if (response?.data) {
        let user_ = {};
        user_.username = response.data.username;
        user_.role = response.data.role;
        user_.id = response.data._id;
        user_.email = response.data.email;
        user_.joined = new Date(response.data.createdAt).toDateString();
        setUser(user_);
        fetchComments(user_.id);
      }
    } catch (error) {
      getError(error, "Failed to fetch user", toast);
    }
  }, []);

  const fetchComments = useCallback(
    async (userId) => {
      try {
        setIsLoading(true);
        const response = await authAxios.get(backendApi.comment.getByOwner(userId, page.currentPage - 1, 10));
        if (response?.data) {
          setData(response.data.comments);
          setPage({ ...page, totalCount: response.data.count, totalPage: Math.ceil(response.data.count / 10) });
        }
      } catch (error) {
        getError(error, "Failed to fetch comments", toast);
      } finally {
        setIsLoading(false);
      }
    },
    [page.currentPage]
  );

  const setCurrentPage = (page_) => {
    setPage({ ...page, currentPage: page_ });
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user?.id) {
        fetchComments(user.id);
      } else {
        if (route.params?.username) {
          setUser({
            username: route.params?.username,
            role: route.params?.role,
            id: route.params?.id,
            email: route.params?.email,
            joined: new Date(route.params?.joined).toDateString()
          });
          fetchComments(route.params?.id);
        } else {
          fetchCurrentUser();
        }
      }
    }, [route.params?.username, page.currentPage])
  );

  const handleTopicClick = (topicId, title) => {
    navigation.navigate("TopicPage", { topic: { _id: topicId, title: title } });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView w="100%" h="100%" bg="dark.100">
          <Box mb="4%" pt="8%" flex={1}>
            <HStack justifyContent="flex-start" mx="6%" space={6}>
              <Avatar size="xl" source={dummyAvatar} />
              {user?.username && (
                <Box>
                  <Text fontSize="2xl" color="darkBlue.100">
                    {user.username}
                  </Text>
                  <Text fontSize="md" color="muted.300">
                    {user.role}
                  </Text>
                  <Text fontSize="xs" color="muted.400">
                    Joined {user.joined}
                  </Text>
                </Box>
              )}
            </HStack>
          </Box>
          <Box mb="8%">
            {data.map((entry) => (
              <Box borderColor="muted.400" py="2%" px="4%" key={entry._id}>
                <HStack justifyContent="space-between">
                  <Pressable onPress={() => handleTopicClick(entry.topicId, entry.title)}>
                    <Text fontSize="lg" color="darkBlue.100" bold>
                      {entry.title}
                    </Text>
                  </Pressable>

                  <Text fontSize="xs" color="muted.400" pr="2%">
                    {new Date(entry.createdAt).toDateString()}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="white">
                  {entry.content}
                </Text>
              </Box>
            ))}
          </Box>
          {page.totalPage > 1 && <Pagination currentPage={page.currentPage} totalPage={page.totalPage} setCurrentPage={setCurrentPage} />}
        </ScrollView>
      )}
    </>
  );
};
