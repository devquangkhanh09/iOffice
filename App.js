import "react-native-gesture-handler";
import app from "./firebaseApp";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { IconComponentProvider } from "@react-native-material/core";
import { SafeAreaView, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import OnBoardingNavigator from "./src/components/OnBoardingNavigator";
import AppNavigator from "./src/components/AppNavigator";
import { storeData, getData, removeData } from "./src/services/asyncStorage";

import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BaseToast } from "react-native-toast-message/lib/src/components/BaseToast";

const { width, height } = Dimensions.get("window");

export default function App() {
  const [user, setUser] = useState(null);

  const onSignOut = async () => {
    await removeData("user");
    await signOut(getAuth());
    setUser(null);
  };

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#FFFF00",
          backgroundColor: "#FFFF00",
          borderRadius: 20,
          width: 0.95 * width,
          opacity: 0.85,
        }}
        contentContainerStyle={{ paddingHorizontal: 25 }}
        text1Style={{
          marginLeft: 20,
          fontSize: 18,
          fontWeight: "bold",
        }}
        text2Style={{
          marginLeft: 20,
          fontSize: 13,
          fontWeight: "400",
        }}
      />
    ),
  };
  useEffect(() => {
    if (!user)
      getData("user").then((userFromStorage) => setUser(userFromStorage));

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
          {user ? (
            <AppNavigator onSignOut={onSignOut} />
          ) : (
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: "white",
              }}
            >
              <OnBoardingNavigator />
            </SafeAreaView>
          )}
        </NavigationContainer>
      </IconComponentProvider>
      <Toast config={toastConfig} visibilityTime={100000}/>
    </SafeAreaProvider>
  );
}
