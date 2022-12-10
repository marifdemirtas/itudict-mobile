import { Dimensions, TouchableOpacity, Animated } from "react-native";
import { Box, Center } from "native-base";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Latest } from "../screens/feed/Latest";
import { Popular } from "../screens/feed/Popular";
import { Profile } from "../screens/profile/Profile";

const Tab = createMaterialTopTabNavigator();

const initialLayout = {
  width: Dimensions.get("window").width,
};

const CustomizedTabBar = ({ state, descriptors, navigation, position }) => {
  return (
    <Center width="100%" bg="dark.100" paddingTop="10%">
      <Box
        flexDirection="row"
        width="95%"
        borderColor="darkBlue.100"
        borderWidth="1"
        borderRadius="sm"
        backgroundColor="dark.100"
        text_={{ color: "white" }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;
          const borderWidth = isFocused ? 5 : 0;
          const color = isFocused ? "#fafafa" : "#a3a3a3";

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Box
              borderBottomWidth={borderWidth}
              borderColor="darkBlue.100"
              flex={1}
              alignItems="center"
              p="3"
              cursor="pointer"
              key={index}
            >
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <Animated.Text style={{ color }}>{label}</Animated.Text>
              </TouchableOpacity>
            </Box>
          );
        })}
      </Box>
    </Center>
  );
};

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomizedTabBar {...props} />}
      initialLayout={initialLayout}
    >
      <Tab.Screen name="Latest" component={Latest} />
      <Tab.Screen name="Popular" component={Popular} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
