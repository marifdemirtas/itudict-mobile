import { Box, useToast } from "native-base";
import { TopicList } from "../../components/feed/TopicList";
import React, { useContext, useState } from "react";
import { AxiosContext } from "../../contexts/AxiosContext";
import { backendApi } from "../../utils/urls";
import { Loading } from "../../components/common/Loading";
import { getError } from "../../utils/error";
import { useFocusEffect } from "@react-navigation/native";

export const Latest = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const { authAxios } = useContext(AxiosContext);

  const fetchLatestTopics = async () => {
    try {
      setIsLoading(true);
      const response = await authAxios.get(backendApi.topic.latest);
      if (response?.data) {
        setData(response.data);
      }
    } catch (error) {
      getError(error, "Failed to fetch latest topics", toast);
    } finally {
      setIsLoading(false);
    }
  };

  const goToTopicPage = (topic) => {
    navigation.navigate("TopicPage", { topic });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchLatestTopics();
    }, [])
  );

  return <>{isLoading ? <Loading /> : <TopicList data={data} topicNavigation={goToTopicPage} />}</>;
};
