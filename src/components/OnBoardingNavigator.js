import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import LogInScreen from "../screens/LogInScreen";

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
                name="LogIn"
                options={{
                    headerLeft: null,
                    headerShown: false,
                    gestureEnabled: false
                }}
                component={LogInScreen}
            />
        </Stack.Navigator>
    )
}

export default OnBoardingNavigator;