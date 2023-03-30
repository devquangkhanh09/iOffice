import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { IconComponentProvider } from "@react-native-material/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import OnBoarding from "./src/components/OnBoarding";
import AppNavigator from "./src/components/AppNavigator";
import { NavigationContainer, StackActions } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const iconComponent = MaterialCommunityIcons;

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="OnBoarding"
              component={OnBoarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              options={{
                headerLeft: null, 
                headerShown: false
              }}
              listeners={({ navigation }) => ({
                beforeRemove: (e) => {
                  e.preventDefault();
                  navigation.dispatch(StackActions.replace('Home'));
                },
              })}
            >
              {() => (
                <IconComponentProvider IconComponent={iconComponent}>
                  <AppNavigator />
                </IconComponentProvider>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
