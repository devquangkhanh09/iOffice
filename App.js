import 'react-native-gesture-handler';
import app from "./firebaseApp";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { IconComponentProvider } from "@react-native-material/core";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import OnBoardingNavigator from "./src/components/OnBoardingNavigator";
import AppNavigator from "./src/components/AppNavigator";
import { storeData, getData, removeData } from "./src/services/asyncStorage";

export default function App() {
  const [user, setUser] = useState(null);

  const onSignOut = async () => {
    await removeData("user");
    await signOut(getAuth());
    setUser(null);
  };

  useEffect(() => {
    if (!user) getData("user").then(userFromStorage => setUser(userFromStorage));

    onAuthStateChanged(getAuth(), (userFromFirebase) => {
      if (userFromFirebase) {
        storeData("user", userFromFirebase);
        setUser(userFromFirebase);
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <NavigationContainer>
          {
            user
              ? <AppNavigator onSignOut={onSignOut} />
              : <SafeAreaView
                style={{
                  flex: 1,
                  backgroundColor: "white",
                }}
              >
                <OnBoardingNavigator />
              </SafeAreaView>
          }
        </NavigationContainer>
      </IconComponentProvider>
    </SafeAreaProvider>
  );
}
