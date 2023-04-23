import {
    createMaterialBottomTabNavigator,
} from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ControlScreen from "../screens/ControlScreen";
import DashboardScreen from "../screens/DashboardScreen";
import LogScreen from "../screens/LogScreen";
import BarCodeScannerScreen from "../screens/BarCodeScannerScreen";
import { Icon } from "@react-native-material/core";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
    return (
    <Tab.Navigator
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
        <Tab.Screen
          name="Scanner"
          component={BarCodeScannerScreen}
          options={{
            tabBarLabel: "Scanner",
            tabBarIcon: ({ color }) => (
              <Icon name="barcode" size={26} color={color} />
            ),
          }}
        />
    </Tab.Navigator>
    );
};

export default TabNavigator;