import {
    createMaterialBottomTabNavigator,
} from "@react-navigation/material-bottom-tabs";
import { useEffect, useState } from "react";
import HomeScreen from "../screens/HomeScreen";
import ControlScreen from "../screens/ControlScreen";
import DashboardScreen from "../screens/DashboardScreen";
import LogScreen from "../screens/LogScreen";
import LoadingScreen from "../screens/LoadingScreen";
import { Icon } from "@react-native-material/core";
import { connect } from "../services/client";

const Tab = createMaterialBottomTabNavigator();
const feeds = [
  "/metacrektal/feeds/iot-control.control-led",
  "/metacrektal/feeds/iot-control.control-relay",
  "/metacrektal/feeds/iot-control.control-fan",
  "/metacrektal/feeds/iot-data.data-temp",
  "/metacrektal/feeds/iot-data.data-humid",
  "/metacrektal/feeds/iot-data.data-light",
];

const AppNavigator = () => {
    const [currentFeeds, setCurrentFeeds] = useState([]);

    useEffect(() => {
        feeds.forEach((feed) => {
            connect(feed, (connectedFeed) => {
                setCurrentFeeds((currentFeeds) => [...currentFeeds, connectedFeed]);
            });
        });
    }, []);

    return (
      (currentFeeds.length === feeds.length)
      ? <Tab.Navigator
        activeColor="#1D192B"
        inactiveColor="#1d192b25"
        barStyle={{ backgroundColor: "#E8DEF8" }}
        screenOptions={{ tabBarColor: "#1D192B" }}
      >
        <Tab.Screen
          name="Homepage"
          component={HomeScreen}
          options={{
            tabBarLabel: "Homepage",
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Control"
          component={ControlScreen}
          options={{
            tabBarLabel: "Control",
            tabBarIcon: ({ color }) => (
              <Icon name="lightbulb-multiple" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Log"
          component={LogScreen}
          options={{
            tabBarLabel: "Log",
            tabBarIcon: ({ color }) => (
              <Icon name="view-list-outline" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ color }) => (
              <Icon name="view-dashboard" size={26} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      : <LoadingScreen />
    );
  };
  
  export default AppNavigator;
  