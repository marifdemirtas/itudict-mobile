//TODO: Popular screen
import { TopicList } from "../../components/feed/TopicList";
export const Popular = ({ navigation }) => {
  const goToTopicPage = (topic) => {
    navigation.navigate("TopicPage", { topic });
  };
  const data = [
    {
      id: 1,
      topic: "Topic 1: kasdapıdjaksdna alsdhawıldn asljdhawuldb alsjdhaluwd alsjbdlawd ajlsdlawhd",
      entryCount: 5
    },
    {
      id: 2,
      topic: "Topic 2",
      entryCount: 51
    },
    {
      id: 3,
      topic: "Topic 3",
      entryCount: 25
    }
  ];
  return <TopicList data={data} topicNavigation={goToTopicPage} />;
};
