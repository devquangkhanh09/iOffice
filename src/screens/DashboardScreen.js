import {
    View,
    Pressable
} from "react-native";
import {
    Text
} from "@react-native-material/core";
import { useState } from "react";
import styles from "../styles/styles";
import dashboardStyles from "../styles/Dashboard.styles";

const DashboardScreen = () => {
    const [data, setData] = useState("temperature");
    const [range, setRange] = useState("1 week");

    return (
        <View style={[styles.screen, dashboardStyles.screen]}>
            <Text variant="h3" style={styles.title}>Dashboard</Text>

            <View style={dashboardStyles.selectionRow}>
                <Pressable 
                    onPress={() => setData("temperature")}
                    style={[dashboardStyles.selection, data === "temperature" && dashboardStyles.selectionSelected]}
                >
                    <Text style={[dashboardStyles.selectionText, data === "temperature" && dashboardStyles.selectionTextSelected]}>
                        Temperature
                    </Text>
                </Pressable>
                <Pressable 
                    onPress={() => setData("humidity")}
                    style={[dashboardStyles.selection, data === "humidity" && dashboardStyles.selectionSelected]}
                >
                    <Text style={[dashboardStyles.selectionText, data === "humidity" && dashboardStyles.selectionTextSelected]}>
                        Humidity
                    </Text>
                </Pressable>
            </View>

            <View style={dashboardStyles.selectionRow}>
                <Pressable 
                    onPress={() => setRange("1 week")}
                    style={[dashboardStyles.selection, range === "1 week" && dashboardStyles.selectionSelected]}
                >
                    <Text style={[dashboardStyles.selectionText, range === "1 week" && dashboardStyles.selectionTextSelected]}>
                        1 week
                    </Text>
                </Pressable>
                <Pressable 
                    onPress={() => setRange("1 day")}
                    style={[dashboardStyles.selection, range === "1 day" && dashboardStyles.selectionSelected]}
                >
                    <Text style={[dashboardStyles.selectionText, range === "1 day" && dashboardStyles.selectionTextSelected]}>
                        1 day
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

export default DashboardScreen;