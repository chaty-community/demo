import React from "react";
import { Text, AsyncStorage } from "react-native";
import { Icon } from "react-native-elements";
import Login from "./Login";
import Profile from "./Profile";
import Room from "./Room";
import Users from "./Users";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

class Navigator extends React.Component {
  render() {
    const isLoggedInText = AsyncStorage.getItem("isLoggedIn");
    let isLoggedIn = false;
    if (isLoggedInText == "true") isLoggedIn = true;
    const Navigation = createAppContainer(SignedInNavigator);
    return <Navigation />;
  }
}

export default Navigator;

const UsersNavigator = createStackNavigator(
  {
    LoginView: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    UsersView: {
      screen: Users,
      navigationOptions: {
        title: "ユーザーリスト",
        headerLeft: null,
        headerStyle: {
          backgroundColor: "#002f6a",
          borderBottomColor: "#002f6a",
          borderBottomWidth: 2,
          height: 100,
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
        headerTintColor: "#ffffff",
      },
    },
    RoomView: {
      screen: Room,
      navigationOptions: {
        title: "チャットルーム",
        headerStyle: {
          backgroundColor: "#002f6a",
          borderBottomColor: "#002f6a",
          borderBottomWidth: 2,
          height: 100,
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
        headerTintColor: "#ffffff",
        headerBackTitle: "戻る",
      },
    },
  },
  {
    initialRouteName: "LoginView",
  }
);

const ProfileNavigator = createStackNavigator(
  {
    ProfileView: {
      screen: Profile,
      navigationOptions: {
        title: "プロフィール",
        headerStyle: {
          backgroundColor: "#002f6a",
          borderBottomColor: "#002f6a",
          borderBottomWidth: 2,
          height: 100,
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
        headerTintColor: "#ffffff",
      },
    },
  },
  {
    initialRouteName: "ProfileView",
  }
);

const SignedInNavigator = createBottomTabNavigator(
  {
    UsersTab: {
      screen: UsersNavigator,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              color: `${focused ? "#002f6a" : "#ffffff"}`,
              paddingTop: 5,
            }}
          >
            ユーザーリスト
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Icon name="person" color={focused ? "#002f6a" : "#ffffff"} />
        ),
        tabBarOptions: {
          style: {
            height: 65,
            backgroundColor: "#8ce5ff",
            paddingTop: 20,
            paddingBottom: 20,
            shadowColor: "#002f6a",
            shadowOffset: { width: 0, height: -1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
        },
      },
    },
    ProfileTab: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              color: `${focused ? "#002f6a" : "#ffffff"}`,
              paddingTop: 5,
            }}
          >
            プロフィール
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <Icon name="settings" color={focused ? "#002f6a" : "#ffffff"} />
        ),
        tabBarOptions: {
          style: {
            height: 65,
            backgroundColor: "#8ce5ff",
            paddingTop: 20,
            paddingBottom: 20,
            shadowColor: "#002f6a",
            shadowOffset: { width: 0, height: -1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
        },
      },
    },
  },
  { initialRouteName: "UsersTab" }
);

UsersNavigator.navigationOptions = ({ navigation }) => ({
  tabBarVisible: navigation.state.index === 1,
});
