import {
    View,
} from "react-native";
import {
    Text
} from "@react-native-material/core";
import styles from "../styles/styles";
import logStyles from "../styles/LogScreen.styles";

const data = [
    {
        id: 1,
        time: "15:30, 01/04/2023",
        user: "Steve",
        device: "Fan",
        action: "on",
    },
    {
        id: 2,
        time: "17:00, 01/04/2023",
        user: "Steve",
        device: "Light bulb",
        action: "off",
    },
];

const LogScreen = () => {
    return (
        <View style={[styles.screen, logStyles.screen]}>
            <Text variant="h3" style={styles.title}>Activity Log</Text>
            {data.map((item) => (
                <View key={item.id} style={logStyles.activity}>
                    <View style={logStyles.activityTop}>
                        <Text style={logStyles.activityTopText}>{item.user}</Text>
                        <Text style={logStyles.activityTopText}>{item.time}</Text>
                    </View>
                    <View style={logStyles.activityBottom}>
                        <Text style={logStyles.activityBottomText}>{item.device}: {item.action}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

export default LogScreen;