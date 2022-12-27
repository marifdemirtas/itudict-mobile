import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile } from "../screens/profile/Profile";

const ProfilePageStack = createNativeStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfilePageStack.Navigator screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}>
      <ProfilePageStack.Screen name="My ProfileScreen" component={Profile} />
      <ProfilePageStack.Screen name="UserProfile" component={Profile} />
    </ProfilePageStack.Navigator>
  );
};
