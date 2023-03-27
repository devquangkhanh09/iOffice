import {
    View,
} from "react-native";
import {
    Text
} from "@react-native-material/core";
import styles from "../styles/styles";

const HomeScreen = () => {
    return (
        <View style={styles.screen}>
            <Text variant="h3" style={styles.title}>Home</Text>
        </View>
    );
}

export default HomeScreen;