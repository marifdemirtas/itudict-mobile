import { Dimensions, TouchableOpacity, Animated } from "react-native";
import { Box, Center, IconButton, useToast } from "native-base";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LatestNavigator } from "./LatestNavigator";
import { PopularNavigator } from "./PopularNavigator";
import { ProfileNavigator } from "./ProfileNavigator";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { getError } from "../utils/error";
import { AxiosContext } from "../contexts/AxiosContext";
import { backendApi } from "../utils/urls";

const Tab = createMaterialTopTabNavigator();

const initialLayout = {
  width: Dimensions.get("window").width
};

const CustomizedTabBar = ({ state, descriptors, navigation, position, authContext, authAxios }) => {
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await authAxios.get(backendApi.logout);
      authContext.logout();
    } catch (error) {
      getError(error, "Logout Failed", toast);
    }
  };

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
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
          const isFocused = state.index === index;
          const borderWidth = isFocused ? 5 : 0;
          const color = isFocused ? "#fafafa" : "#a3a3a3";

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name !== "Profile" ? route.name + "Screen" : route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key
            });
          };

          return (
            <Box borderBottomWidth={borderWidth} borderColor="darkBlue.100" flex={1} alignItems="center" p="3" cursor="pointer" key={index}>
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
        <IconButton onPress={handleLogout} _icon={{ as: FontAwesome, name: "sign-out", color: "darkBlue.100" }} />
      </Box>
    </Center>
  );
};

export const HomeTabs = () => {
  const authContext = useContext(AuthContext);
  const { authAxios } = useContext(AxiosContext);
  return (
    <Tab.Navigator tabBar={(props) => <CustomizedTabBar {...props} authContext={authContext} authAxios={authAxios} />} initialLayout={initialLayout}>
      <Tab.Screen name="Latest" component={LatestNavigator} />
      <Tab.Screen name="Popular" component={PopularNavigator} />
      <Tab.Screen name="My Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};
