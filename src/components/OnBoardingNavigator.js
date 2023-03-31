import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackActions } from "@react-navigation/native";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import AppNavigator from "./AppNavigator";

const Stack = createNativeStackNavigator();

const OnBoardingNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="OnBoarding"
                component={OnBoardingScreen}
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
                {() => <AppNavigator />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default OnBoardingNavigator;