import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import {
    getData,
    storeData
} from '../services/asyncStorage';
import LoadingScreen from "../screens/LoadingScreen";
import CustomDrawerContent from "./CustomDrawerContent";
import TabNavigator from "./TabNavigator";
import { FETCH_URL } from '@env';

const Drawer = createDrawerNavigator();

const AppNavigator = ({ onSignOut }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const code = await getData('code');
                const res = await fetch(`${FETCH_URL}/api/qrcode`, {
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

                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
            
        })();
    }, [])

    return (
        isLoading ? <LoadingScreen /> :
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} onSignOut={onSignOut} />}
        >
            <Drawer.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

export default AppNavigator;
