import {
    View,
    Pressable
} from "react-native";
import {
    Text
} from "@react-native-material/core";
import { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import styles from "../styles/styles";
import dashboardStyles from "../styles/Dashboard.styles";

const data = {
    labels: ["01/04", "02/04", "03/04", "04/04", "05/04", "06/04", "07/04"],
    datasets: [
      {
        data: [27, 29, 30, 24, 25, 25, 27],
        color: (opacity = 1) => `rgba(3, 40, 252, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ["Temperature"]
};

const chartConfig = {
    backgroundGradientFrom: "#606163",
    backgroundGradientFromOpacity: 0.1,
    backgroundGradientTo: "#606163",
    backgroundGradientToOpacity: 0.1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 0,
};

const DashboardScreen = () => {
    const [type, setType] = useState("temperature");
    const [range, setRange] = useState("1 week");

    return (
        <View style={[styles.screen, dashboardStyles.screen]}>
            <Text variant="h3" style={styles.title}>Dashboard</Text>

            <View style={dashboardStyles.selectionRow}>
                <Pressable 
                    onPress={() => setType("temperature")}
                    style={[dashboardStyles.selection, type === "temperature" && dashboardStyles.selectionSelected]}
                >
                    <Text style={[dashboardStyles.selectionText, type === "temperature" && dashboardStyles.selectionTextSelected]}>
                        Temperature
                    </Text>
                </Pressable>
                <Pressable 
                    onPress={() => setType("humidity")}
                    style={[dashboardStyles.selection, type === "humidity" && dashboardStyles.selectionSelected]}
                >
                    <Text style={[dashboardStyles.selectionText, type === "humidity" && dashboardStyles.selectionTextSelected]}>
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

            <LineChart
                data={data}
                width={Dimensions.get("window").width - 50}
                height={220}
                chartConfig={chartConfig}
                style={dashboardStyles.chart}
            />
        </View>
    );
}

export default DashboardScreen;