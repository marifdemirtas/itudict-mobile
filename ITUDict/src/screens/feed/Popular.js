import { TopicList } from "../../components/feed/TopicList";
import React, { useContext, useState } from "react";
import { AxiosContext } from "../../contexts/AxiosContext";
import { backendApi } from "../../utils/urls";
import { Loading } from "../../components/common/Loading";
import { useToast, Box } from "native-base";
import { getError } from "../../utils/error";
import { useFocusEffect } from "@react-navigation/native";

export const Popular = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const { authAxios } = useContext(AxiosContext);

  const fetchPopularTopics = async () => {
    try {
      setIsLoading(true);
      const response = await authAxios.get(backendApi.topic.popular);
      if (response?.data) {
        setData(response.data);
      }
    } catch (error) {
      getError(error, "Failed to fetch popular topics", toast);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPopularTopics();
    }, [])
  );

  const goToTopicPage = (topic) => {
    navigation.navigate("TopicPage", { topic });
  };

  return <>{isLoading ? <Loading /> : <TopicList data={data} topicNavigation={goToTopicPage} />}</>;
};
