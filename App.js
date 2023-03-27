import { IconComponentProvider } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from "./src/components/AppNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </IconComponentProvider>
    </SafeAreaProvider>
  );
}
