import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import BlogScreen from "./src/screens/BlogScreen";
import CommentScreen from "./src/screens/CommentScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import { Feather } from "@expo/vector-icons";
import AnnouncementScreen from "./src/screens/AnnouncementScreen";
import GuidesScreen from "./src/screens/GuidesScreen";
import { Provider as ScheduleProvider } from "./src/context/ScheduleContext";
import { Provider as BlogProvider } from "./src/context/BlogContext";
import { Provider as CommentProvider } from "./src/context/CommentContext";
import { Provider as AttendanceProvider } from "./src/context/AttendanceContext";
import { Provider as ScheduleRangeProvider } from "./src/context/ScheduleRangeContext";
import { createStackNavigator } from "react-navigation-stack";

const blogFlow = createStackNavigator({
  BlogScreen: BlogScreen,
  CommentScreen: CommentScreen,
  initialRouteName: BlogScreen
});
const bottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Schedule: {
      screen: ScheduleScreen,
      navigationOptions: {
        tabBarLabel: "Schedule",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Feather
              style={[{ color: tintColor }]}
              size={25}
              name={"calendar"}
            />
          </View>
        )
      }
    },
    Blog: {
      screen: blogFlow,
      navigationOptions: {
        tabBarLabel: "Blog",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Feather style={[{ color: tintColor }]} size={25} name={"edit"} />
          </View>
        )
      }
    },
    Announcement: {
      screen: AnnouncementScreen,
      navigationOptions: {
        tabBarLabel: "Announcement",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Feather
              style={[{ color: tintColor }]}
              size={25}
              name={"message-square"}
            />
          </View>
        )
      }
    },
    Guides: {
      screen: GuidesScreen,
      navigationOptions: {
        tabBarLabel: "Guides",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Feather
              style={[{ color: tintColor }]}
              size={25}
              name={"file-text"}
            />
          </View>
        )
      }
    }
  },
  {
    initialRouteName: "Schedule",
    inactiveColor: "#f0edf6",
    activeColor: "#3e2465",
    barStyle: { backgroundColor: "#fcb2c5" }
  }
);

const App = createAppContainer(bottomTabNavigator);

export default () => {
  return (
    <ScheduleRangeProvider>
      <ScheduleProvider>
        <BlogProvider>
          <CommentProvider>
            <AttendanceProvider>
              <App />
            </AttendanceProvider>
          </CommentProvider>
        </BlogProvider>
      </ScheduleProvider>
    </ScheduleRangeProvider>
  );
  // return (
  //   <ScheduleProvider>
  //     <BlogProvider>
  //       <CommentProvider>
  //         <AttendanceProvider>
  //           <App />
  //         </AttendanceProvider>
  //       </CommentProvider>
  //     </BlogProvider>
  //   </ScheduleProvider>
  // );
};
