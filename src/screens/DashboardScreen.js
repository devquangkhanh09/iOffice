import {
    View,
} from "react-native";
import {
    Text
} from "@react-native-material/core";
import styles from "../styles/styles";

const DashboardScreen = () => {
    return (
        <View style={styles.screen}>
            <Text variant="h3" style={styles.title}>Dashboard</Text>
        </View>
    );
}

export default DashboardScreen;