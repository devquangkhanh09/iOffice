import { createDrawerNavigator } from '@react-navigation/drawer';
import LoadingScreen from "../screens/LoadingScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const AppNavigator = ({onSignOut}) => {

    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} onSignOut={onSignOut} />}
      >
        <Drawer.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}} />
      </Drawer.Navigator> 
    );
  };
  
  export default AppNavigator;
  