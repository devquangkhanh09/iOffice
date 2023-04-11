import { 
    Button,
    Text, 
} from "@react-native-material/core";
import { View } from "react-native";

const LoadingScreen = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            rowGap: 10,
        }}>
            <Text>Loading...</Text>
            <Button
                style={{ backgroundColor: "transparent" }}   
                loading
                disabled
            />
        </View>
    );
};

export default LoadingScreen;