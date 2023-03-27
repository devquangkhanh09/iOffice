import {
    createMaterialBottomTabNavigator,
} from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ControlScreen from "../screens/ControlScreen";
import DashboardScreen from "../screens/DashboardScreen";
import { Icon } from "@react-native-material/core";

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => {
    return (
      <Tab.Navigator
        activeColor="#1D192B"
        inactiveColor="#1d192b25"
        barStyle={{ backgroundColor: "#E8DEF8" }}
        screenOptions={{ tabBarColor: "#1D192B" }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
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
    );
  };
  
  export default AppNavigator;
  