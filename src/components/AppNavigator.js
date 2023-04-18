import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect, useState } from "react";
import LoadingScreen from "../screens/LoadingScreen";
import { connect } from "../services/client";
import CustomDrawerContent from "./CustomDrawerContent";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();
const feeds = [
  "/metacrektal/feeds/iot-control.control-led",
  "/metacrektal/feeds/iot-control.control-relay",
  "/metacrektal/feeds/iot-control.control-fan",
  "/metacrektal/feeds/iot-data.data-temp",
  "/metacrektal/feeds/iot-data.data-humid",
  "/metacrektal/feeds/iot-data.data-light",
];

const AppNavigator = ({onSignOut}) => {
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
      ? <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} onSignOut={onSignOut} />}
      >
          <Drawer.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}} />
      </Drawer.Navigator> 
      : <LoadingScreen />
    );
  };
  
  export default AppNavigator;
  