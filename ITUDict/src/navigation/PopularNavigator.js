import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Popular } from "../screens/feed/Popular";
import { TopicPage } from "../screens/feed/TopicPage";

const PopularPageStack = createNativeStackNavigator();

export const PopularNavigator = () => {
  return (
    <PopularPageStack.Navigator screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}>
      <PopularPageStack.Screen name="PopularScreen" component={Popular} />
      <PopularPageStack.Screen name="TopicPage" component={TopicPage} />
    </PopularPageStack.Navigator>
  );
};
