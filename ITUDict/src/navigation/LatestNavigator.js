import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Latest } from "../screens/feed/Latest";
import { TopicPage } from "../screens/feed/TopicPage";

const LatestPageStack = createNativeStackNavigator();

export const LatestNavigator = () => {
  return (
    <LatestPageStack.Navigator screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}>
      <LatestPageStack.Screen name="LatestScreen" component={Latest} />
      <LatestPageStack.Screen name="TopicPage" component={TopicPage} />
    </LatestPageStack.Navigator>
  );
};
