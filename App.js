import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { IconComponentProvider } from "@react-native-material/core";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import OnBoardingNavigator from "./src/components/OnBoardingNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
          <NavigationContainer>
            <OnBoardingNavigator />
          </NavigationContainer>
        </IconComponentProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
