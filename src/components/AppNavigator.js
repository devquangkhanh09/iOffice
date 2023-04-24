import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect } from 'react';
import {
    getData,
    storeData
} from '../services/asyncStorage';
import LoadingScreen from "../screens/LoadingScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const AppNavigator = ({ onSignOut }) => {

    useEffect(() => {
        (async () => {
            try {
                const code = await getData('code');
                const res = await fetch('https://428e-113-161-73-48.ngrok-free.app/api/qrcode', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        code
                    })
                });
                const data = await res.text();
                if (data === 'success') await storeData('status', 'at office');
                else await storeData('status', 'not at office');
            } catch (error) {
                console.log(error.message);
            }
            
        })();
    }, [])

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} onSignOut={onSignOut} />}
        >
            <Drawer.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

export default AppNavigator;
