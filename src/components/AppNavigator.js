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
import { Toast } from "react-native-toast-message/lib/src/Toast";
import {
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    onSnapshot,
} from "firebase/firestore";

const Drawer = createDrawerNavigator();

const AppNavigator = ({ onSignOut }) => {
    const [isLoading, setIsLoading] = useState(true);

    const db = getFirestore();

    useEffect(() => {
        const qTemp = query(
            collection(db, "data-temp"),
            orderBy("timestamp", "desc"),
            limit(1)
        );

        const unsubscribeTemp = onSnapshot(qTemp, (querySnapshot) => {
            if (querySnapshot.docs[0].data().value > 30) {
                Toast.show({
                    type: "warning",
                    text1: "⚠️ WARNING",
                    text2: "Nhiệt độ vượt ngưỡng",
                });
            } else if (querySnapshot.docs[0].data().value < 20) {
                Toast.show({
                    type: "warning",
                    text1: "⚠️ WARNING",
                    text2: "Nhiệt độ dưới ngưỡng",
                });
            }
        });

        const qHumd = query(
            collection(db, "data-humd"),
            orderBy("timestamp", "desc"),
            limit(1)
        );

        const unsubscribeHumd = onSnapshot(qHumd, (querySnapshot) => {
            if (querySnapshot.docs[0].data().value > 80) {
                Toast.show({
                    type: "warning",
                    text1: "⚠️ WARNING",
                    text2: "Độ ẩm vượt ngưỡng",
                });
            } else if (querySnapshot.docs[0].data().value < 30) {
                Toast.show({
                    type: "warning",
                    text1: "⚠️ WARNING",
                    text2: "Độ ẩm dưới ngưỡng",
                });
            }
        });

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
