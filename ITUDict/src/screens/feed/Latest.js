//TODO: Latest screen

import { Box } from "native-base";
import { CreateTopic } from "../../components/feed/CreateTopic";
import { TopicList } from "../../components/feed/TopicList";

export const Latest = () => {
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
    },
    {
      id: 4,
      topic: "Topic 4",
      entryCount: 5
    },
    {
      id: 5,
      topic: "Topic 5",
      entryCount: 5
    },
    {
      id: 6,
      topic: "Topic 6",
      entryCount: 5
    },
    {
      id: 7,
      topic: "Topic 7",
      entryCount: 5
    },
    {
      id: 8,
      topic: "Topic 8",
      entryCount: 5
    },
    {
      id: 9,
      topic: "Topic 9",
      entryCount: 5
    },
    {
      id: 10,
      topic: "Topic 10",
      entryCount: 5
    },
    {
      id: 11,
      topic: "Topic 11",
      entryCount: 5
    },
    {
      id: 12,
      topic: "Topic 12",
      entryCount: 5
    },
    {
      id: 13,
      topic: "Topic 13",
      entryCount: 5
    },
    {
      id: 14,
      topic: "Topic 14",
      entryCount: 5
    },
    {
      id: 15,
      topic: "Topic 15",
      entryCount: 5
    },
    {
      id: 16,
      topic: "Topic 16",
      entryCount: 5
    },
    {
      id: 17,
      topic: "Topic 17",
      entryCount: 5
    },
    {
      id: 18,
      topic: "Topic 18",
      entryCount: 5
    },
    {
      id: 19,
      topic: "Topic 19",
      entryCount: 5
    },
    {
      id: 20,
      topic: "Topic 20",
      entryCount: 5
    }
  ];
  return (
    <Box w="100%" h="100%">
      <TopicList data={data} isAdmin={<CreateTopic />} />
    </Box>
  );
};
